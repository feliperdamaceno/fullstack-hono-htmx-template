import type { ViewComponent, ViewProps } from '#types/view.types'

import { html } from 'hono/html'

import RegisterForm from '#views/components/forms/register-form'
import BaseLayout from '#views/layouts/base'

const title = 'Register your account'

const Register: ViewComponent<ViewProps> = ({ data }) => {
  return BaseLayout({
    head: html`<title>${title}</title>`,
    body: html`
      <main class="grid flex-1 place-items-center bg-zinc-50 p-4 text-zinc-800">
        <div
          class="w-full max-w-md space-y-10 rounded-md bg-white px-6 py-12 shadow-sm"
        >
          <h2 class="text-center text-2xl font-bold">${title}</h2>

          ${RegisterForm({ data })}
        </div>
      </main>
    `
  })
}

export default Register
