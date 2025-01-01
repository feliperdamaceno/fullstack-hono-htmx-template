import type { View, ViewComponent, ViewProps } from '#type/view.type'

import { html } from 'hono/html'

interface Props extends ViewProps {
  head: View
  main: View
}

const RootLayout: ViewComponent<Props> = ({ head, main }) => {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/static/css/main.css" />
        <script src="/static/js/main.js" defer></script>
        ${head}
      </head>
      <body>
        <main class="container">${main}</main>
      </body>
    </html>
  `
}

export default RootLayout
