import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const posts = pgTable('post', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  tagId: text('tagId')
    .notNull()
    .references(() => tags.id),
  title: text('title').notNull(),
  content: text('content').notNull(),
  // TODO: timezone 사용하기
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').$onUpdate(() => new Date()),
})

export const tags = pgTable('tag', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  name: text('name').notNull(),
})
