import type { ViewComponent, ViewProps } from '#types/view.types'

import { html } from 'hono/html'

interface FormFieldProps extends ViewProps {
  name: string
  type: 'text' | 'email' | 'password'
  placeholder: string
  ariaDescribedBy?: string
}

const FormField: ViewComponent<FormFieldProps> = ({
  name,
  type,
  placeholder,
  ariaDescribedBy = ''
}) => {
  return html`
    <input
      id="${name}"
      class="w-full rounded-md border border-zinc-300 px-4 py-3 text-sm outline-orange-500/90 placeholder:text-zinc-500"
      name="${name}"
      type="${type}"
      placeholder="${placeholder}"
      aria-describedby="${ariaDescribedBy}"
      hx-preserve
      required
    />
  `
}

export default FormField
