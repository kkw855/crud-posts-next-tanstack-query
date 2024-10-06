import { migrate } from 'drizzle-orm/node-postgres/migrator'

import { db } from '@/db/db'

try {
  await migrate(db, { migrationsFolder: 'drizzle' })
  console.log('Migration completed🚀')
  process.exit(0)
} catch (error) {
  console.error('Error during migration:', error)
  process.exit(1)
}
