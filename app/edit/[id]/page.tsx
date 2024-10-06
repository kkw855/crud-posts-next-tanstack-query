'use client'

import { SubmitHandler } from 'react-hook-form'

import LoadingIndicator from '@/app/loading-indicator'

import { PostForm } from '@/app/post-form'

import { FormInputPost } from '@/app/schema'
import { useGetPost } from '@/api/queries'
import { useUpdatePost } from '@/api/mutations'

type Prop = Readonly<{
  params: { id: string }
}>

export default function EditPostPage(props: Prop) {
  const {
    params: { id },
  } = props

  const { data: post, isPending: isPendingPost, isError } = useGetPost(id)

  const {
    mutate: updatePost,
    isPending: isPendingSubmit,
    isSuccess,
  } = useUpdatePost(id)

  if (isPendingPost) return <LoadingIndicator />
  if (isError) throw new Error()

  const initialValues = {
    title: post.title,
    content: post.content,
    tagId: post.tag.id,
  }

  const onSubmit: SubmitHandler<FormInputPost> = (data) => {
    updatePost(data)
  }

  return (
    <PostForm
      onSubmit={onSubmit}
      isEditing={true}
      isLoadingSubmit={isPendingSubmit || isSuccess}
      initialValues={initialValues}
    />
  )
}
