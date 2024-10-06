'use client'

import { SubmitHandler } from 'react-hook-form'

import { PostForm } from '@/app/post-form'

import { FormInputPost } from '@/app/schema'
import { useCreatePost } from '@/api/mutations'

export default function CreatePostPage() {
  const { mutate: createPost, isPending, isSuccess } = useCreatePost()

  const onSubmit: SubmitHandler<FormInputPost> = (data) => {
    createPost(data)
  }

  return (
    <PostForm
      onSubmit={onSubmit}
      isEditing={false}
      isLoadingSubmit={isPending || isSuccess}
    />
  )
}
