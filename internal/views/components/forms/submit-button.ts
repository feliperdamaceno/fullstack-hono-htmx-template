import type { ViewComponent, ViewProps } from '#types/view.types'

import { html } from 'hono/html'

interface SubmitButtonProps extends ViewProps {
  label: string
}

const SubmitButton: ViewComponent<SubmitButtonProps> = ({ label }) => {
  return html`
    <button
      class="mt-6 cursor-pointer rounded-full bg-orange-500/90 px-4 py-2 text-sm font-medium text-white outline-2 outline-offset-2 transition-all hover:bg-orange-600/90 focus-visible:outline-orange-500/90"
      type="submit"
    >
      ${label}
    </button>
  `
}

export default SubmitButton
