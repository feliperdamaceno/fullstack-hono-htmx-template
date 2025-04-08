import type { View, ViewComponent, ViewProps } from '#type/view.type'

import { html } from 'hono/html'

interface Props extends ViewProps {
  head: View
  body: View
}

const BaseLayout: ViewComponent<Props> = ({ head, body }) => {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/htmx.org@2.0.4" defer></script>
        <script src="/static/dist/bundle.js" defer></script>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="/static/dist/main.css" />
        ${head}
      </head>

      <body>
        ${body}
      </body>
    </html>
  `
}

export default BaseLayout
