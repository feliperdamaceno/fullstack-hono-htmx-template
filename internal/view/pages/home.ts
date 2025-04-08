import type { ViewComponent, ViewProps } from '#type/view.type'

import { html } from 'hono/html'

import BaseLayout from '#view/layouts/base'

interface Props extends ViewProps {
  data: {
    title: string
  }
}

const Home: ViewComponent<Props> = ({ data: { title } }) => {
  return BaseLayout({
    head: html`<title>${title}</title>`,
    body: html`
      <section>
        <h1>${title}</h1>
      </section>
    `
  })
}

export default Home
