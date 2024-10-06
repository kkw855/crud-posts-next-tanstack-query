import { defineConfig } from 'drizzle-kit'
import { Config, Effect } from 'effect'

const DATABASE_URL = Effect.runSync(Config.string('DATABASE_URL'))

export default defineConfig({
  schema: './db/schema.ts',
  dialect: 'postgresql',
  out: './drizzle',
  dbCredentials: {
    url: DATABASE_URL,
  },
})
