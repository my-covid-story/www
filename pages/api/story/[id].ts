import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const storyId = req.query.id

  if (req.method === 'GET') {
    handleGET(storyId, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/post/:id
async function handleGET(storyId, res) {
  const post = await prisma.story.findUnique({
    where: { id: Number(storyId) },
  })
  res.json(post)
}
