import type { View, ViewComponent, ViewProps } from '#type/view.type'

import { html } from 'hono/html'

interface Props extends ViewProps {
  head: View
  body: View
}

const RootLayout: ViewComponent<Props> = ({ head, body }) => {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/static/assets/main.css" />
        <script src="/static/assets/bundle.js" defer></script>
        ${head}
      </head>

      <body>
        ${body}
      </body>
    </html>
  `
}

export default RootLayout
