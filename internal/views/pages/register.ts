import type { ViewComponent } from '#types/view.types'

import { html } from 'hono/html'

import BaseLayout from '#views/layouts/base'

const Register: ViewComponent = () => {
  return BaseLayout({
    head: html`<title>Register your account</title>`,
    body: html`
      <main class="grid flex-1 place-items-center bg-zinc-50 p-4 text-zinc-800">
        <div
          class="w-full max-w-md space-y-10 rounded-md bg-white px-6 py-12 shadow-sm"
        >
          <h2 class="text-center text-2xl font-bold">Register your account</h2>

          <form class="grid gap-6" hx-post="/register" hx-swap="none">
            <label class="grid gap-2">
              <span class="text-sm font-medium">Name</span>

              <input
                class="w-full rounded-md border border-zinc-300 px-4 py-3 text-sm outline-orange-500/90 placeholder:text-zinc-500"
                name="name"
                type="text"
                placeholder="Enter your name"
                required
              />
            </label>

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

            <input class="hidden" name="role" value="user" type="hidden" />

            <button
              class="mt-6 cursor-pointer rounded-full bg-orange-500/90 px-4 py-2 text-sm font-medium text-white outline-2 outline-offset-2 transition-all hover:bg-orange-600/90 focus-visible:outline-orange-500/90"
              type="submit"
            >
              Register now
            </button>

            <p class="text-center text-sm text-zinc-500">
              Already have an account?
              <a
                href="/login"
                class="font-semibold text-orange-500/90 transition-colors hover:text-orange-600/90"
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </main>
    `
  })
}

export default Register
