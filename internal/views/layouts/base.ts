import type { View, ViewComponent, ViewProps } from '#types/view.types'

import { html } from 'hono/html'

interface BaseLayoutProps extends ViewProps {
  head: View
  body: View
}

const BaseLayout: ViewComponent<BaseLayoutProps> = ({ head, body }) => {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="/static/main.css" />
        <script src="https://unpkg.com/htmx.org@2.0.4" defer></script>
        <script src="/static/bundle.js" defer></script>
        ${head}
      </head>

      <body class="flex min-h-screen flex-col">
        ${body}
      </body>
    </html>
  `
}

export default BaseLayout
