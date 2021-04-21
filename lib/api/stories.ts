import sanitizeHtml from 'sanitize-html'
import { PrismaClientValidationError } from '@prisma/client/runtime'
import { ValidationError } from 'yup'
import prisma from '../prisma'
import storySchema from '../storySchema'
import { badRequest, internalServerError, notFound } from '../errors'

const select = {
  id: true,
  createdAt: true,
  updatedAt: true,
  title: true,
  content: true,
  postal: true,
  category: true,
  approved: true,
  viewCount: true,
}

// GET /api/stories
export async function list() {
  try {
    return await prisma.story.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
      select,
    })
  } catch (err) {
    console.error(err)
    throw internalServerError()
  }
}

export interface NewStory {
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
export async function add(story: NewStory) {
  const payload = Object.keys(story).reduce((acc, k) => {
    // Strip empty values
    if (story[k] === '') {
      return acc
      // Sanitize any strings
    } else if (typeof story[k] === 'string') {
      acc[k] = sanitizeHtml(story[k], { allowedTags: [], allowedAttributes: {} })
      // Don't forget the rest
    } else {
      acc[k] = story[k]
    }
    return acc
  }, {}) as NewStory

  try {
    // Validate the payload against the schema
    await storySchema.validate(payload)
    return await prisma.story.create({
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
  } catch (err) {
    if (err instanceof ValidationError) {
      throw badRequest({ detail: `Invalid story: ${err}` })
    } else {
      console.error(err)
      throw internalServerError()
    }
  }
}

// GET /api/stories/:id
export async function get(id: string) {
  try {
    const story = await prisma.story.findUnique({ where: { id: id } })
    if (story != null && story.approved) {
      return story
    }
  } catch (err) {
    if (!(err instanceof PrismaClientValidationError)) {
      console.error(err)
      throw internalServerError()
    }
  }
  throw notFound()
}
