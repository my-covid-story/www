import type { NextApiRequest, NextApiResponse } from 'next'
import { methodNotAllowed, sendError } from '../../../lib/errors'
import * as stories from '../../../lib/api/stories'

// GET /api/stories/:id
export default function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return stories.get(req.query.id as string).then(res.json, (err) => sendError(res, err))
    default:
      sendError(res, methodNotAllowed({ allowed: ['GET'] }))
      return Promise.resolve()
  }
}
