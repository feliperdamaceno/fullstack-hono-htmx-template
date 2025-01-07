import { relations } from 'drizzle-orm'
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const User = pgTable('user', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  roleId: integer('role_id')
    .references(() => Role.id)
    .notNull()
})

export const Role = pgTable('role', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull().unique(),
  description: varchar({ length: 255 }).default('').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const UsersRelations = relations(User, ({ one }) => ({
  role: one(Role, {
    fields: [User.roleId],
    references: [Role.id]
  })
}))

export const RolesRelations = relations(Role, ({ many }) => ({
  users: many(User)
}))
