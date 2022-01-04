import type { NextApiRequest, NextApiResponse } from 'next'
import { methodNotAllowed, sendError } from '../../../lib/errors'
import * as stories from '../../../lib/api/stories'
import { withSentry } from '@sentry/nextjs'

// GET /api/stories/:id
const handle = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return stories
        .get(req.query.id as string)
        .then(res.json, (err) => sendError(res, err))
    default:
      sendError(res, methodNotAllowed({ allowed: ['GET'] }))
      return Promise.resolve()
  }
}

export default withSentry(handle)
