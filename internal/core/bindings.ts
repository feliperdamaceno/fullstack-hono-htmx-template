import type { AppInstance } from '#core/app'

import { Container } from '#core/container'
import { RoleRepository } from '#repositories/role.repository'
import { UserRepository } from '#repositories/user.repository'
import { AuthService } from '#services/auth.service'
import { UserService } from '#services/user.service'

/**
 * Maps service keys to their corresponding classes in the application.
 *
 * This interface defines the available repositories and services that can be registered
 * and resolved within the container.
 */
export interface Bindings {
  RoleRepository: RoleRepository
  UserRepository: UserRepository
  UserService: UserService
  AuthService: AuthService
}

/**
 * Registers application bindings into the provided container.
 *
 * This function registers repositories and services, resolving dependencies as needed.
 *
 * @param app - The app instance used to provide necessary dependencies (e.g., database).
 * @param container - The container where services and repositories are registered.
 */
export function loadBindings(app: AppInstance, container: Container<Bindings>) {
  /* Repositories */
  container.register('RoleRepository', () => new RoleRepository(app.database))
  container.register('UserRepository', () => new UserRepository(app.database))

  /* Services */
  container.register('UserService', () => {
    return new UserService(
      container.resolve('RoleRepository'),
      container.resolve('UserRepository')
    )
  })
  container.register('AuthService', () => {
    return new AuthService(container.resolve('UserService'))
  })
}
