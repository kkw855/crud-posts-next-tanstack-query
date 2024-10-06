'use sever'

import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { posts, tags } from '@/db/schema'
import { db } from '@/db/db'
import { FormInputPost } from '@/app/schema'

type ContextProp = Readonly<{
  params: {
    postId: string
  }
}>

export async function GET(_: NextRequest, context: ContextProp) {
  const {
    params: { postId },
  } = context

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
      .where(eq(posts.id, postId))

    return NextResponse.json(array[0], { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'could not fetch post' },
      { status: 500 },
    )
  }
}

export async function DELETE(_: NextRequest, context: ContextProp) {
  const {
    params: { postId },
  } = context

  try {
    await db.delete(posts).where(eq(posts.id, postId))

    return NextResponse.json({ message: 'delete success' }, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'could not delete post' },
      { status: 500 },
    )
  }
}

export async function PATCH(req: NextRequest, context: ContextProp) {
  const {
    params: { postId },
  } = context

  try {
    const body = (await req.json()) as FormInputPost

    await db
      .update(posts)
      .set({
        title: body.title,
        content: body.content,
        tagId: body.tagId,
      })
      .where(eq(posts.id, postId))
      .returning()

    return NextResponse.json({ message: 'update success ' }, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'could not update post' },
      { status: 500 },
    )
  }
}
