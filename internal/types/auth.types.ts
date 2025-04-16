import type { UserSelect } from '#models/user.model'

export type AuthToken = {
  id: Pick<UserSelect, 'id'>
  email: Pick<UserSelect, 'email'>
  role: Pick<UserSelect, 'role'>
  iat: number
  exp: number
}
