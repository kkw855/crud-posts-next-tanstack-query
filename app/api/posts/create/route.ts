import { NextRequest, NextResponse } from 'next/server'

import { posts } from '@/db/schema'
import { db } from '@/db/db'
import { FormInputPost } from '@/app/schema'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FormInputPost

    const post = await db.insert(posts).values(body).returning()

    return NextResponse.json(post, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'could not create post' },
      { status: 500 },
    )
  }
}
