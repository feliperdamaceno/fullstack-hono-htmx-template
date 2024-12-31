import { Hono } from 'hono'
import { app } from '#app/app'

const router = new Hono()

router.get('/', async (ctx) => {
  const templ = await app.edge.render('pages/homepage')
  return ctx.html(templ)
})

export default router
