import type { ViewComponent } from '#types/view.types'

import { html } from 'hono/html'

import BaseLayout from '#views/layouts/base'

const Login: ViewComponent = () => {
  return BaseLayout({
    head: html`<title>Log in to your account</title>`,
    body: html`
      <main class="grid flex-1 place-items-center bg-zinc-50 p-4 text-zinc-800">
        <div
          class="w-full max-w-md space-y-10 rounded-md bg-white px-6 py-12 shadow-sm"
        >
          <h2 class="text-center text-2xl font-bold">Log in to your account</h2>

          <form class="grid gap-6" hx-post="/login" hx-swap="none">
            <label class="grid gap-2">
              <span class="text-sm font-medium">Email address</span>

              <input
                class="w-full rounded-md border border-zinc-300 px-4 py-3 text-sm outline-orange-500/90 placeholder:text-zinc-500"
                name="email"
                type="email"
                placeholder="Enter your email address"
                required
              />
            </label>

            <label class="grid gap-2">
              <span class="text-sm font-medium">Password</span>

              <input
                class="w-full rounded-md border border-zinc-300 px-4 py-3 text-sm outline-orange-500/90 placeholder:text-zinc-500"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </label>

            <button
              class="mt-6 cursor-pointer rounded-full bg-orange-500/90 px-4 py-2 text-sm font-medium text-white outline-2 outline-offset-2 transition-all hover:bg-orange-600/90 focus-visible:outline-orange-500/90"
              type="submit"
            >
              Login
            </button>

            <p class="text-center text-sm text-zinc-500">
              Don't have an account yet?
              <a
                href="/register"
                class="font-semibold text-orange-500/90 transition-colors hover:text-orange-600/90"
              >
                Register here
              </a>
            </p>
          </form>
        </div>
      </main>
    `
  })
}

export default Login
