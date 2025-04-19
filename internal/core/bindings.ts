import type { AppInstance } from '#core/app'

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
 * Registers repositories and services into the application container.
 *
 * Sets up dependency injection for core components like repositories and services,
 * wiring them with required dependencies (e.g., database).
 *
 * @param app - The application instance used to resolve and register dependencies.
 */
export function loadBindings(app: AppInstance) {
  /* Repositories */
  app.container.register('RoleRepository', () => {
    return new RoleRepository(app.database)
  })
  app.container.register('UserRepository', () => {
    return new UserRepository(app.database)
  })

  /* Services */
  app.container.register('UserService', () => {
    return new UserService(
      app.container.resolve('RoleRepository'),
      app.container.resolve('UserRepository')
    )
  })
  app.container.register('AuthService', () => {
    return new AuthService(app.container.resolve('UserRepository'))
  })
}
