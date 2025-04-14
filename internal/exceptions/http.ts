import { HTTPException } from 'hono/http-exception'

/**
 * Custom error class for Unauthorized (401) status.
 * Indicates that the client must authenticate to get the requested response.
 */
export class UnauthorizedError extends HTTPException {
  constructor(message: string = 'Unauthorized') {
    super(401, { message })
  }
}

/**
 * Custom error class for Forbidden (403) status.
 * Indicates that the server understood the request but refuses to authorize it.
 */
export class ForbiddenError extends HTTPException {
  constructor(message: string = 'Forbidden') {
    super(403, { message })
  }
}

/**
 * Custom error class for Not Found (404) status.
 * Indicates that the server can't find the requested resource.
 */
export class NotFoundError extends HTTPException {
  constructor(message: string = 'Not Found') {
    super(404, { message })
  }
}

/**
 * Custom error class for Method Not Allowed (405) status.
 * Indicates that the HTTP method used is not supported for the requested resource.
 */
export class MethodNotAllowedError extends HTTPException {
  constructor(message: string = 'Method Not Allowed') {
    super(405, { message })
  }
}

/**
 * Custom error class for Not Acceptable (406) status.
 * Indicates that the server cannot produce a response matching the list of acceptable values.
 */
export class NotAcceptableError extends HTTPException {
  constructor(message: string = 'Not Acceptable') {
    super(406, { message })
  }
}

/**
 * Custom error class for Bad Request (400) status.
 * Indicates that the server could not understand the request due to invalid syntax.
 */
export class BadRequestError extends HTTPException {
  constructor(message: string = 'Bad Request') {
    super(400, { message })
  }
}

/**
 * Custom error class for Conflict (409) status.
 * Indicates that the request could not be processed because of a conflict in the request.
 */
export class ConflictError extends HTTPException {
  constructor(message: string = 'Conflict') {
    super(409, { message })
  }
}

/**
 * Custom error class for Internal Server Error (500) status.
 * Indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
 */
export class InternalServerError extends HTTPException {
  constructor(message: string = 'Internal Server Error') {
    super(500, { message })
  }
}

/**
 * Custom error class for Service Unavailable (503) status.
 * Indicates that the server is not ready to handle the request, typically due to being overloaded or down for maintenance.
 */
export class ServiceUnavailableError extends HTTPException {
  constructor(message: string = 'Service Unavailable') {
    super(503, { message })
  }
}

/**
 * Custom error class for Too Many Requests (429) status.
 * Indicates that the user has sent too many requests in a given amount of time.
 */
export class TooManyRequestsError extends HTTPException {
  constructor(message: string = 'Too Many Requests') {
    super(429, { message })
  }
}
