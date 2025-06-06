import type { ErrorDetails } from '#types/http.types'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

import { HTTPException } from 'hono/http-exception'

/**
 * Custom base error class for HTTP exceptions with optional detailed errors.
 */
class BaseHTTPException extends HTTPException {
  public errors?: ErrorDetails

  constructor(
    status?: ContentfulStatusCode,
    message?: string,
    errors?: ErrorDetails
  ) {
    super(status, { message })
    if (errors) this.errors = errors
  }
}

/**
 * Custom error class for Bad Request (400) status.
 * Indicates that the server could not understand the request due to invalid syntax.
 */
export class BadRequestError extends BaseHTTPException {
  constructor(message: string = 'Bad Request', errors?: ErrorDetails) {
    super(400, message, errors)
  }
}

/**
 * Custom error class for Unauthorized (401) status.
 * Indicates that the client must authenticate to get the requested response.
 */
export class UnauthorizedError extends BaseHTTPException {
  constructor(message: string = 'Unauthorized', errors?: ErrorDetails) {
    super(401, message, errors)
  }
}

/**
 * Custom error class for Forbidden (403) status.
 * Indicates that the server understood the request but refuses to authorize it.
 */
export class ForbiddenError extends BaseHTTPException {
  constructor(message: string = 'Forbidden', errors?: ErrorDetails) {
    super(403, message, errors)
  }
}

/**
 * Custom error class for Not Found (404) status.
 * Indicates that the server can't find the requested resource.
 */
export class NotFoundError extends BaseHTTPException {
  constructor(message: string = 'Not Found', errors?: ErrorDetails) {
    super(404, message, errors)
  }
}

/**
 * Custom error class for Method Not Allowed (405) status.
 * Indicates that the HTTP method used is not supported for the requested resource.
 */
export class MethodNotAllowedError extends BaseHTTPException {
  constructor(message: string = 'Method Not Allowed', errors?: ErrorDetails) {
    super(405, message, errors)
  }
}

/**
 * Custom error class for Not Acceptable (406) status.
 * Indicates that the server cannot produce a response matching the list of acceptable values.
 */
export class NotAcceptableError extends BaseHTTPException {
  constructor(message: string = 'Not Acceptable', errors?: ErrorDetails) {
    super(406, message, errors)
  }
}

/**
 * Custom error class for Conflict (409) status.
 * Indicates that the request could not be processed because of a conflict in the request.
 */
export class ConflictError extends BaseHTTPException {
  constructor(message: string = 'Conflict', errors?: ErrorDetails) {
    super(409, message, errors)
  }
}

/**
 * Custom error class for Unprocessable Entity (422) status.
 * Indicates that the request could not be processed due to semantic errors, like missing or invalid fields.
 */
export class UnprocessableEntityError extends BaseHTTPException {
  constructor(message: string = 'Unprocessable Entity', errors?: ErrorDetails) {
    super(422, message, errors)
  }
}

/**
 * Custom error class for Internal Server Error (500) status.
 * Indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
 */
export class InternalServerError extends BaseHTTPException {
  constructor(
    message: string = 'Internal Server Error',
    errors?: ErrorDetails
  ) {
    super(500, message, errors)
  }
}

/**
 * Custom error class for Service Unavailable (503) status.
 * Indicates that the server is not ready to handle the request, typically due to being overloaded or down for maintenance.
 */
export class ServiceUnavailableError extends BaseHTTPException {
  constructor(message: string = 'Service Unavailable', errors?: ErrorDetails) {
    super(503, message, errors)
  }
}

/**
 * Custom error class for Too Many Requests (429) status.
 * Indicates that the user has sent too many requests in a given amount of time.
 */
export class TooManyRequestsError extends BaseHTTPException {
  constructor(message: string = 'Too Many Requests', errors?: ErrorDetails) {
    super(429, message, errors)
  }
}
