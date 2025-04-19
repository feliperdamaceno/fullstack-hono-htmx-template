export type Factory<T> = () => T

/**
 * A container for managing service instances and their dependencies.
 *
 * This class allows registering services with a factory function and resolving it by key.
 * It ensures that only one instance of a service is created and reused.
 *
 * @template Bindings - The interface that maps service keys to their corresponding types.
 */
export class Container<Bindings extends Record<keyof Bindings, unknown>> {
  private readonly instances = new Map<keyof Bindings, unknown>()
  private readonly factories = new Map<keyof Bindings, Factory<unknown>>()

  /**
   * Registers a service in the container with a factory function.
   *
   * @param key - The key used to resolve the service.
   * @param factory - The factory function that creates an instance of the service.
   */
  register<K extends keyof Bindings>(key: K, factory: Factory<Bindings[K]>) {
    this.factories.set(key, factory)
  }

  /**
   * Resolves a service by its key.
   * If the service has already been instantiated, the existing instance is returned.
   * Otherwise, the service is created using the registered factory function.
   *
   * @param key - The key used to resolve the service.
   * @returns The resolved service instance.
   * @throws Error if the factory for the key is not found.
   */
  resolve<K extends keyof Bindings>(key: K): Bindings[K] {
    if (!this.instances.has(key)) {
      const factory = this.factories.get(key)
      if (!factory) throw new Error(`Factory "${String(key)}" not found`)
      this.instances.set(key, (factory as Factory<Bindings[K]>)())
    }
    return this.instances.get(key) as Bindings[K]
  }
}
