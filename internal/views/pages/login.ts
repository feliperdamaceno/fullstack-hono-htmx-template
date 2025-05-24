import type { ViewComponent, ViewProps } from '#types/view.types'

import { html } from 'hono/html'

import LoginForm from '#views/components/forms/login-form'
import BaseLayout from '#views/layouts/base'

const title = 'Log in to your account'

const Login: ViewComponent<ViewProps> = ({ data }) => {
  return BaseLayout({
    head: html`<title>${title}</title>`,
    body: html`
      <main class="grid flex-1 place-items-center bg-zinc-50 p-4 text-zinc-800">
        <div
          class="w-full max-w-md space-y-10 rounded-md bg-white px-6 py-12 shadow-sm"
        >
          <h2 class="text-center text-2xl font-bold">${title}</h2>

          ${LoginForm({ data })}
        </div>
      </main>
    `
  })
}

export default Login
