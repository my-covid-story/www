import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { story, postal } = req.body
  const result = await prisma.story.create({
    data: {
      content: story,
      postal: postal
    },
  })
  res.json(result)
}
