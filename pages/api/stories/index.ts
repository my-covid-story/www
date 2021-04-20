import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClientValidationError } from '@prisma/client/runtime'
import prisma from '../../../lib/prisma'
import { sendError, methodNotAllowed, badRequest, internalServerError } from '../../../lib/errors'
import storySchema from '../../../lib/storySchema'
import { ValidationError } from 'yup'
import sanitizeHtml from 'sanitize-html'

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

interface Payload {
  title: string
  content: string
  postal: string
  category: string
  name?: string
  email?: string
  phone?: string
  twitter?: string
  anonymous: boolean
  contact: boolean
  consent?: boolean
}

// POST /api/stories
async function handlePost(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const payload = Object.keys(req.body).reduce((acc, k) => {
    // Strip empty values
    if (req.body[k] === '') {
      return acc
    }
    // Parse anonymous to boolean
    else if (k === 'anonymous') {
      acc[k] = JSON.parse(req.body[k])
      // Sanitize any strings
    } else if (typeof req.body[k] === 'string') {
      acc[k] = sanitizeHtml(req.body[k], { allowedTags: [], allowedAttributes: {} })
      // Don't forget the rest
    } else {
      acc[k] = req.body[k]
    }
    return acc
  }, {}) as Payload

  try {
    // Validate the payload against the schema
    await storySchema.validate(payload)
    const result = await prisma.story.create({
      data: {
        title: payload.title,
        content: payload.content,
        postal: payload.postal,
        category: payload.category,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        twitter: payload.twitter,
        anonymous: payload.anonymous,
        contact: payload.contact,
      },
    })
    res.setHeader('Location', `${baseUrl}${req.url}/${result.id}`)
    res.status(201).json(result)
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      sendError(res, badRequest({ detail: 'Invalid story' }))
    } else if (err instanceof ValidationError) {
      sendError(res, badRequest({ detail: `Form payload failed validation: ${err}` }))
    } else {
      console.log(err)
      sendError(res, internalServerError())
    }
  }
}
