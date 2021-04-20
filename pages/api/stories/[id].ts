import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClientValidationError } from '@prisma/client/runtime'
import prisma from '../../../lib/prisma'
import { sendError, methodNotAllowed, notFound, internalServerError } from '../../../lib/errors'

// /api/stories/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case 'GET':
      await handleGet(req, res)
      break
    default:
      sendError(res, methodNotAllowed({ allowed: ['GET'] }))
  }
}

// GET /api/stories/:id
async function handleGet(req, res): Promise<void> {
  const { id } = req.query

  try {
    const story = await prisma.story.findUnique({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        title: true,
        content: true,
        postal: true,
        category: true,
      },
    })
    if (story == null) {
      sendError(res, notFound())
    } else {
      res.json(story)
    }
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      sendError(res, notFound())
    } else {
      console.log(err)
      sendError(res, internalServerError())
    }
  }
}
