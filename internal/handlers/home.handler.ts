import { Hono } from 'hono'
import { User } from 'internal/models/user.model.ts'

import { app } from '#core/app'
import { database } from '#database/driver'

const router = new Hono()

router.get('/', async (ctx) => {
  const user = await database
    .select({
      name: User.name
    })
    .from(User)

  const view = await app.view.render('home', {
    title: 'Welcome',
    name: user[0]?.name || ''
  })

  return ctx.html(view)
})

export default router
