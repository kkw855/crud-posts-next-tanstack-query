'use server'

import { NextResponse } from 'next/server'

import { db } from '@/db/db'
import { tags as tagsTable } from '@/db/schema'

export async function GET() {
  try {
    const tags = await db.select().from(tagsTable)
    return NextResponse.json(tags, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'could not fetch tags' },
      { status: 500 },
    )
  }
}
