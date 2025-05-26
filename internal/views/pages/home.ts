import type { ViewComponent, ViewProps } from '#types/view.types'

import { html } from 'hono/html'

import SubmitButton from '#views/components/forms/submit-button'
import BaseLayout from '#views/layouts/base'

interface HomeProps extends ViewProps {
  data?: {
    name?: string
  }
}

const Home: ViewComponent<HomeProps> = ({ data }) => {
  return BaseLayout({
    head: html`<title>Home</title>`,
    body: html`
      <main class="grid flex-1 place-items-center text-zinc-800">
        <div class="space-y-6 text-center">
          <h1 class="text-2xl font-medium capitalize">
            Hello, ${data?.name || 'guest'}!
          </h1>

          <form hx-post="/logout" hx-swap="none">
            ${SubmitButton({ label: 'Logout' })}
          </form>
        </div>
      </main>
    `
  })
}

export default Home
