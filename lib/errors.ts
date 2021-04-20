import type { NextApiResponse } from 'next'

interface ResponseError {
  status: number
  message: string
  detail?: string
  allowed?: string[]
}

export function badRequest(options: { detail?: string } = {}): ResponseError {
  const { detail } = options
  return {
    status: 400,
    message: 'Bad request',
    detail,
  }
}

export function unauthorized(): ResponseError {
  return {
    status: 401,
    message: 'Unauthorized',
  }
}

export function notFound(): ResponseError {
  return {
    status: 404,
    message: 'Not found',
  }
}

export function methodNotAllowed(options: { allowed?: string[] } = {}): ResponseError {
  const { allowed = [] } = options
  return {
    status: 405,
    message: 'Method not allowed',
    allowed,
  }
}

export function internalServerError(): ResponseError {
  return {
    status: 500,
    message: 'Internal server error',
  }
}

export function sendError(res: NextApiResponse, err: ResponseError): void {
  res.status(err.status).json(err)
}
