'use client'

import { Badge } from '@/components/ui/badge'

import { BackButton } from '@/components/back-button'
import { ButtonAction } from '@/app/button-action'
import LoadingIndicator from '@/app/loading-indicator'

import { useGetPost } from '@/api/queries'

type Prop = Readonly<{
  params: { id: string }
}>

export default function PostDetailPage(props: Prop) {
  const { id } = props.params

  const { data: post, isPending, isError } = useGetPost(id)

  if (isPending) return <LoadingIndicator />
  if (isError) throw new Error()

  return (
    <div>
      <div className="space-y-4">
        <BackButton />
        <h2 className="font-bold">{post.title}</h2>
        <ButtonAction id={id} />
      </div>
      <div className="mt-12">
        <Badge>{post.tag.name}</Badge>
        <p>{post.content}</p>
      </div>
    </div>
  )
}
