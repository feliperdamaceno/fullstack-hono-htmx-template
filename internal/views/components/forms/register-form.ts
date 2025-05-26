import type { ErrorDetails } from '#types/http.types'
import type { ViewComponent, ViewProps } from '#types/view.types'

import { html } from 'hono/html'

import ErrorList from '#views/components/forms/error-list'
import FormField from '#views/components/forms/form-field'
import SubmitButton from '#views/components/forms/submit-button'

interface RegisterFormProps extends ViewProps {
  data?: {
    errors?: ErrorDetails<{
      name?: string[]
      email?: string[]
      password?: string[]
    }>
  }
}

const RegisterForm: ViewComponent<RegisterFormProps> = ({ data }) => {
  return html`
    <form
      class="grid gap-6"
      hx-post="/register"
      hx-target="this"
      hx-swap="outerHTML"
    >
      <!-- Adjust this value accordingly to match your main user role PK. -->
      <input class="hidden" name="role" value="user" type="hidden" />

      <label class="grid gap-2">
        <span class="text-sm font-medium">Name</span>

        ${FormField({
          name: 'name',
          type: 'text',
          placeholder: 'Enter your name',
          ariaDescribedBy: data?.errors?.name && 'name-errors'
        })}
        ${ErrorList({ id: 'name-errors', errors: data?.errors?.name })}
      </label>

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

      ${SubmitButton({ label: 'Register now' })}

      <p class="text-center text-sm text-zinc-500">
        Already have an account?
        <a
          href="/login"
          class="font-semibold text-orange-500/90 transition-colors hover:text-orange-600/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500/90"
        >
          Login here
        </a>
      </p>
    </form>
  `
}

export default RegisterForm
