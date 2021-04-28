import type { NextApiResponse } from 'next'

interface ResponseErrorOptions {
  detail?: string
  allowed?: string[]
}

export interface ResponseError extends ResponseErrorOptions {
  message: string
  status: number
}

export class ResponseError extends Error {
  constructor(message: string, status: number, options: ResponseErrorOptions = {}) {
    super(message)
    Error.captureStackTrace(this, ResponseError)
    this.status = status
    const { detail, allowed } = options
    if (detail != null) {
      this.detail = detail
    }
    if (allowed != null) {
      this.allowed = allowed
    }
  }
}

export function badRequest(options: { detail?: string } = {}): ResponseError {
  return new ResponseError('Bad request', 400, options)
}

export function unauthorized(): ResponseError {
  return new ResponseError('Unauthorized', 401)
}

export function notFound(): ResponseError {
  return new ResponseError('Not found', 404)
}

export function methodNotAllowed(options: { allowed?: string[] } = {}): ResponseError {
  return new ResponseError('Method not allowed', 405, options)
}

export function internalServerError(): ResponseError {
  return new ResponseError('Internal server error', 500)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function sendError(res: NextApiResponse, err: any): void {
  if (!(err instanceof ResponseError)) {
    console.error(err)
    err = internalServerError()
  }
  res.status(err.status).json({ message: err.message, ...err })
}
