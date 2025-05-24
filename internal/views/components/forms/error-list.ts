import type { ViewComponent, ViewProps } from '#types/view.types'

import { html } from 'hono/html'

import ErrorField from '#views/components/forms/error-field'

interface ErrorListProps extends ViewProps {
  id: string
  errors?: string[]
}

const ErrorList: ViewComponent<ErrorListProps> = ({ id, errors }) => {
  if (!errors || errors.length === 0) return html``

  return html`
    <div
      id="${id}"
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      class="flex flex-col gap-1"
    >
      ${errors.map((error) => ErrorField({ error }))}
    </div>
  `
}

export default ErrorList
