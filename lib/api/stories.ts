import { PrismaClientValidationError } from '@prisma/client/runtime'
import { ValidationError } from 'yup'
import prisma from '../prisma'
import storySchema from '../storySchema'
import { SELECT, fixTitle } from '../model/story'
import { badRequest, internalServerError, notFound } from '../errors'

// GET /api/stories
export async function list(limit: number = null) {
  const takeLimit = { take: limit }
  try {
    return await prisma.story.findMany({
      where: { approved: true },
      orderBy: { updatedAt: 'desc' },
      select: SELECT,
      ...(limit && takeLimit),
    })
  } catch (err) {
    console.error('Failed to retrieve stories:', err)
    throw internalServerError()
  }
}

export interface NewStory {
  title: string
  content: string
  postal: string
  category: string
  contactName?: string
  displayName?: string
  email?: string
  phone?: string
  twitter?: string
  consent?: boolean
}

// POST /api/stories
export async function add(story: NewStory) {
  const payload = Object.keys(story).reduce((acc, k) => {
    // Strip empty values
    if (story[k] === '') {
      return acc
      // Clean up title
    } else if (k === 'title') {
      acc[k] = fixTitle(story[k])
      // Uppercase postal
    } else if (k === 'postal') {
      acc[k] = story[k].toUpperCase()
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
        contactName: payload.contactName,
        displayName: payload.displayName,
        email: payload.email,
        phone: payload.phone,
        twitter: payload.twitter,
      },
    })
  } catch (err) {
    if (err instanceof ValidationError) {
      throw badRequest({ detail: `Invalid story: ${err}` })
    } else {
      console.error('Failed to add story:', err)
      throw internalServerError()
    }
  }
}

// GET /api/stories/:id
export async function get(id: string) {
  try {
    const story = await prisma.story.findUnique({ where: { id: id }, select: SELECT })
    if (story != null && story.approved) {
      return story
    }
  } catch (err) {
    if (!(err instanceof PrismaClientValidationError)) {
      console.error(`Failed to retrieve story ${id}:`, err)
      throw internalServerError()
    }
  }
  throw notFound()
}
