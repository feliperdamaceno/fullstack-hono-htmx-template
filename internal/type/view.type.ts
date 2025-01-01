import type { html } from 'hono/html'

export type View = ReturnType<typeof html>

export type ViewData = {
  [key: string]: unknown
}

export type ViewProps = {
  data?: ViewData
  [key: string]: unknown
}

export type ViewComponent<Props extends ViewProps = ViewProps> = (
  props: Props
) => View
