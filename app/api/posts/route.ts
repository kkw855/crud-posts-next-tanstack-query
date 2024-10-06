import { db } from '@/db/db'
import { posts, tags } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const array = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        tag: {
          id: tags.id,
          name: tags.name,
        },
      })
      .from(posts)
      .leftJoin(tags, eq(posts.tagId, tags.id))
      .orderBy(desc(posts.createdAt))

    return NextResponse.json(array, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'could not fetch posts' },
      { status: 500 },
    )
  }
}
