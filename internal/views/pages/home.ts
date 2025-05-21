import type { ViewComponent, ViewProps } from '#types/view.types'

import { html } from 'hono/html'

import BaseLayout from '#views/layouts/base'

interface Props extends ViewProps {
  data: {
    title: string
    name?: string
  }
}

const Home: ViewComponent<Props> = ({ data: { title, name } }) => {
  return BaseLayout({
    head: html`<title>${title}</title>`,
    body: html`
      <main class="grid flex-1 place-items-center text-zinc-800">
        <div class="space-y-6 text-center">
          <h1 class="text-2xl font-medium capitalize">
            Hello, ${name || 'guest'}!
          </h1>

          <form hx-post="/logout" hx-swap="none">
            <button
              class="cursor-pointer rounded-full bg-orange-500/90 px-4 py-2 text-sm font-medium text-white outline-2 outline-offset-2 transition-all hover:bg-orange-600/90 focus-visible:outline-orange-500/90"
              type="submit"
            >
              Logout
            </button>
          </form>
        </div>
      </main>
    `
  })
}

export default Home
