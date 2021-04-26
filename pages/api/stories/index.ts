import type { NextApiRequest, NextApiResponse } from 'next'
import { sendError, methodNotAllowed } from '../../../lib/errors'
import * as stories from '../../../lib/api/stories'

// GET, POST /api/stories
export default function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return stories.list().then(res.json, (err) => sendError(res, err))
    case 'POST':
      return stories.add(req.body).then(
        (result) => {
          res.setHeader('Location', `${process.env.NEXT_PUBLIC_VERCEL_URL}${req.url}/${result.id}`)
          res.status(201).json(result)
        },
        (err) => sendError(res, err)
      )
    default:
      sendError(res, methodNotAllowed({ allowed: ['GET', 'POST'] }))
      return Promise.resolve()
  }
}
