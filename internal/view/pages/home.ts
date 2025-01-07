import type { ViewComponent, ViewProps } from '#type/view.type'

import { html } from 'hono/html'

import RootLayout from '#view/layouts/root'

interface Props extends ViewProps {
  data: {
    title: string
  }
}

const Home: ViewComponent<Props> = ({ data: { title } }) => {
  return RootLayout({
    head: html`<title>${title}</title>`,
    body: html`
      <section>
        <h1>${title}</h1>
      </section>
    `
  })
}

export default Home
