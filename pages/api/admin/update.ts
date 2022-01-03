import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { ADMIN_INCLUDE, AdminStory } from '../../../lib/model/story'
import prisma from '../../../lib/prisma'
import { internalServerError, methodNotAllowed, sendError, unauthorized } from '../../../lib/errors'
import * as emailer from '../../../lib/emailer'
import { withSentry } from '@sentry/nextjs'

// PATCH /api/admin/update
// Updates approved, deleted, contentWarning on the story with the given id.
async function handlePatch(req: NextApiRequest, res: NextApiResponse) {
  const { id, approved, deleted, contentWarning } = req.body

  try {
    const story = await prisma.story.update({
      where: { id },
      data: {
        approved,
        deleted,
        contentWarning,
      },
      include: ADMIN_INCLUDE,
    })

    res.json(story)

    // Handle emailing asynchronously after sending the response.
    emailStory(story)
  } catch (err) {
    console.error(`Failed to update story ${id}:`, err)
    sendError(res, internalServerError())
  }
}

// Emails the story to elected representatives if it is approved and has not already been emailed.
async function emailStory(story: AdminStory) {
  const { id } = story

  try {
    // Use an atomic operation to prevent sending multiple emails due to a race condition:
    // Check if the story needs to be emailed and, if so, claim it by marking . in mppMessageId.
    const { count } = await prisma.story.updateMany({
      where: {
        id,
        approved: true,
        mppMessageId: null,
      },
      data: { mppMessageId: '.' },
    })

    // If the story was claimed, email it and record the final message ID.
    // If it is not successfully sent, record null to release it.
    if (count > 0) {
      const mppMessageId = await emailer.send(story)
      await prisma.story.update({
        where: { id },
        data: { mppMessageId },
      })
    }
  } catch (err) {
    console.error(`Failed to manage emailing for story ${id}:`, err)
  }
}

// /api/admin/update
const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (!session) {
    sendError(res, unauthorized())
  }

  switch (req.method) {
    case 'PATCH':
      await handlePatch(req, res)
      break
    default:
      sendError(res, methodNotAllowed({ allowed: ['PATCH'] }))
  }
}

export default withSentry(handle)
