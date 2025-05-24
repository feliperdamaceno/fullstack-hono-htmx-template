export type HttpMethods =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'OPTIONS'
  | 'TRACE'
  | 'CONNECT'

export type ErrorDetails<
  T extends Record<string, string[]> = Record<string, string[]>
> = T
