import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClientValidationError } from '@prisma/client/runtime'
import { getSession } from 'next-auth/client'

import prisma from '../../../lib/prisma'
import { sendError, methodNotAllowed, internalServerError, unauthorized } from '../../../lib/errors'


// /api/admin/update
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const session = await getSession({ req })
  if(!session) {
    return sendError(res, unauthorized())
  }

  switch (req.method) {
    case 'PATCH':
      await handlePatch(req, res)
      break
    case 'DELETE':
      console.log("DELETE")
      await handleDelete(req, res)
      break
    default:
      sendError(res, methodNotAllowed({ allowed: ['PATCH', 'DELETE'] }))
  }
}

// PATCH /api/admin/update
// Required fields in body: id, approved
// Udates Story.approved to value
async function handlePatch(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { id, approved } = req.body
  try {
    const story = await prisma.story.update({
        where: {
          id,
        },
        data: {
          approved,
        },
      })
    res.json(story)
  } catch (err) {
    sendError(res, internalServerError())
  }
}

// DELETE /api/stories
// Required fields in body: id
// Deletes Story with ID
async function handleDelete(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { id } = req.body
  try {
    const story = await prisma.story.delete({
      where: {
        id,
      },
    })
    res.json(story)
  } catch (err) {
    sendError(res, internalServerError())
  }
}
