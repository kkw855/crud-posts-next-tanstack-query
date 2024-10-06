import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { FormInputPost } from '@/app/schema'
import { request } from '@/api/index'

export function useCreatePost() {
  const router = useRouter()

  return useMutation({
    mutationFn: async (newPost: FormInputPost) => {
      return request('/posts/create', {
        method: 'POST',
        body: JSON.stringify(newPost),
      })
    },
    onError: (error: Error) => {
      console.error(error)
    },
    onSuccess: () => {
      router.push('/')
      router.refresh()
    },
  })
}

export function useUpdatePost(id: string) {
  const router = useRouter()

  return useMutation({
    mutationFn: async (updatePost: FormInputPost) => {
      return request(`/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatePost),
      })
    },
    onError: (error: Error) => {
      console.error(error)
    },
    onSuccess: () => {
      router.push('/')
      router.refresh()
    },
  })
}
