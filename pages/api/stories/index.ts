import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClientValidationError } from '@prisma/client/runtime'
import prisma from '../../../lib/prisma'
import { sendError, methodNotAllowed, badRequest, internalServerError } from '../../../lib/errors'

const baseUrl = 'https://mycovidstory.ca'

// /api/stories
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case 'GET':
      await handleGet(req, res)
      break
    case 'POST':
      await handlePost(req, res)
      break
    default:
      sendError(res, methodNotAllowed({ allowed: ['GET', 'POST'] }))
  }
}

// GET /api/stories
async function handleGet(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const stories = await prisma.story.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        createdAt: true,
        title: true,
        content: true,
        postal: true,
        category: true,
      },
    })
    res.json(stories)
  } catch (err) {
    console.log(err)
    sendError(res, internalServerError())
  }
}

// POST /api/stories
// Required fields in body: title, content, postal, category, anonymous, contact
// Optional fields in body: name, email, twitter, phone
// Approved field is set to false by default
async function handlePost(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { title, content, postal, category } = req.body
  try {
    const result = await prisma.story.create({
      data: {
        title,
        content,
        postal,
        category,
        // hardcoded for now
        anonymous: true,
        contact: false,
      },
    })
    res.setHeader('Location', `${baseUrl}${req.url}/${result.id}`)
    res.status(201).json(result)
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      sendError(res, badRequest({ detail: 'Invalid story' }))
    } else {
      console.log(err)
      sendError(res, internalServerError())
    }
  }
}
