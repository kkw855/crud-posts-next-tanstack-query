import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import { Config, Effect, pipe } from 'effect'

import * as schema from '@/db/schema'
/**
 * Drizzle instance 생성
 */
const createDrizzle = pipe(
  Effect.gen(function* () {
    const DATABASE_URL = yield* Config.string('DATABASE_URL')

    const client = new Client({
      connectionString: DATABASE_URL,
    })

    yield* Effect.promise(() => client.connect())

    return drizzle(client, { schema, logger: true })
  }),
  Effect.runPromise,
)

export const db = await createDrizzle
