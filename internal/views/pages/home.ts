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
      <section class="grid min-h-screen place-items-center">
        <h1 class="text-xl capitalize">Hello, ${name || 'guest'}!</h1>
      </section>
    `
  })
}

export default Home
