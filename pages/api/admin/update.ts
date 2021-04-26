import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

import prisma from '../../../lib/prisma'
import { sendError, methodNotAllowed, internalServerError, unauthorized } from '../../../lib/errors'

// /api/admin/update
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
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

// PATCH /api/admin/update
// Required fields in body: id, approved
// Udates Story.approved to value
async function handlePatch(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { id, approved, deleted } = req.body

  try {
    const story = await prisma.story.update({
      where: {
        id,
      },
      data: {
        approved,
        deleted,
      },
    })

    res.json(story)
  } catch (err) {
    sendError(res, internalServerError())
  }
}
