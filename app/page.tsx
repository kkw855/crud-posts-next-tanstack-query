'use client'

import { PostCard } from '@/app/post-card'

import { Post } from '@/types'
import { useGetPosts } from '@/api/queries'
import LoadingIndicator from '@/app/loading-indicator'

export const dynamic = 'force-dynamic'

export default function Home() {
  const { data: posts, isError, isPending } = useGetPosts()

  if (isPending) return <LoadingIndicator />
  if (isError) throw new Error()

  return (
    <div className="grid justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post as Post} />
      ))}
    </div>
  )
}
