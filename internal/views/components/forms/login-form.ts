import type { ErrorDetails } from '#types/http.types'
import type { ViewComponent, ViewProps } from '#types/view.types'

import { html } from 'hono/html'

import ErrorList from '#views/components/forms/error-list'
import FormField from '#views/components/forms/form-field'
import SubmitButton from '#views/components/forms/submit-button'

interface LoginFormProps extends ViewProps {
  data?: {
    errors?: ErrorDetails<{
      email?: string[]
      password?: string[]
    }>
  }
}

const LoginForm: ViewComponent<LoginFormProps> = ({ data }) => {
  return html`
    <form
      class="grid gap-6"
      hx-post="/login"
      hx-target="this"
      hx-swap="outerHTML"
    >
      <label class="grid gap-2">
        <span class="text-sm font-medium">Email address</span>

        ${FormField({
          name: 'email',
          type: 'email',
          placeholder: 'Enter your email address',
          ariaDescribedBy: data?.errors?.email && 'email-errors'
        })}
        ${ErrorList({ id: 'email-errors', errors: data?.errors?.email })}
      </label>

      <label class="grid gap-2">
        <span class="text-sm font-medium">Password</span>

        ${FormField({
          name: 'password',
          type: 'password',
          placeholder: 'Enter your password',
          ariaDescribedBy: data?.errors?.password && 'password-errors'
        })}
        ${ErrorList({ id: 'password-errors', errors: data?.errors?.password })}
      </label>

      ${SubmitButton({ label: 'Login' })}

      <p class="text-center text-sm text-zinc-500">
        Don't have an account yet?
        <a
          href="/register"
          class="font-semibold text-orange-500/90 outline-2 outline-offset-2 transition-colors hover:text-orange-600/90 focus-visible:outline-orange-500/90"
        >
          Register here
        </a>
      </p>
    </form>
  `
}

export default LoginForm
