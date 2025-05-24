import type { ViewComponent, ViewProps } from '#types/view.types'

import { html } from 'hono/html'

interface ErrorFieldProps extends ViewProps {
  error: string
}

const ErrorField: ViewComponent<ErrorFieldProps> = ({ error }) => {
  return html`<small class="text-sm text-red-500">${error}</small>`
}

export default ErrorField
