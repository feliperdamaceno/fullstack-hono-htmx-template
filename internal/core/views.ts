import type { ViewComponent, ViewData } from '#types/view.types'

import path from 'path'

import { InternalServerError } from '#exceptions/http'

/**
 * ViewEngine class handles rendering of views by dynamically importing
 * view components and passing the required data for rendering.
 */
export class ViewEngine {
  private readonly views: string

  /**
   * Constructs an instance of the ViewEngine with the specified views directory.
   * Resolves the provided directory path to an absolute path for consistency.
   *
   * @param dirPath - Relative path to the directory containing view files.
   */
  constructor(dirPath: string) {
    this.views = path.resolve(
      path.dirname(''),
      dirPath.startsWith('/') ? dirPath.slice(1) : dirPath
    )
  }

  /**
   * Renders a view by dynamically importing the view's component and passing the provided data.
   * The view is expected to be a TypeScript module exporting a default function component.
   * If the view rendering fails, an error is logged and a new InternalServerError is thrown.
   *
   * @param view - The name of the view to be rendered (without file extension).
   * @param data - Optional data to pass to the view component for rendering (default is an empty object).
   *
   * @returns The rendered result from the view component.
   * @throws An InternalServerError if the view cannot be loaded or rendered successfully.
   */
  async render(view: string, data: ViewData = {}) {
    try {
      const viewName = view.split('.')[0]
      const viewPath = path.resolve(this.views, `${viewName}.ts`)
      const { default: component } = (await import(viewPath)) as {
        default: ViewComponent
      }
      return component({ data })
    } catch (error) {
      console.error(`Error rendering view ${view}:`, error)
      throw new InternalServerError()
    }
  }
}
