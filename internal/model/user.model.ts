import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

import { relations } from 'drizzle-orm'
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const User = pgTable('user', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  role: varchar('role_name')
    .references(() => Role.name)
    .notNull()
})

export type UserInsert = InferInsertModel<typeof User>
export type UserSelect = InferSelectModel<typeof User>

export const Role = pgTable('role', {
  name: varchar({ length: 50 }).notNull().primaryKey(),
  description: varchar({ length: 255 }).default('').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export type RoleInsert = InferInsertModel<typeof Role>
export type RoleSelect = InferSelectModel<typeof Role>

export const UsersRelations = relations(User, ({ one }) => ({
  role: one(Role, {
    fields: [User.role],
    references: [Role.name]
  })
}))

export const RolesRelations = relations(Role, ({ many }) => ({
  users: many(User)
}))
