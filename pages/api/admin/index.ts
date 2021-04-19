import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/client'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if(session) {
    const posts = await prisma.story.findMany({
        where: { approved: false },
        orderBy: { createdAt: 'asc' },
    })
    res.json(posts)
  } else {
    res.json({})
  }
}