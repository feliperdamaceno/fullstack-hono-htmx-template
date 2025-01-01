import { Hono } from 'hono'

import { app } from '#core/app'

const router = new Hono()

router.get('/', async (ctx) => {
  const view = await app.view.render('home', { title: 'Homepage' })
  return ctx.html(view)
})

export default router
