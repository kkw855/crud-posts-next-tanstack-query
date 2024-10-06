'use client'

import { useQuery } from '@tanstack/react-query'

import { Post, Tag } from '@/types'
import { request } from '@/api/index'

export function useGetPosts() {
  return useQuery({
    queryKey: ['post'],
    queryFn: async () => request<Post[]>(`/posts`),
  })
}

export function useGetPost(id: string) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: async () => request<Post>(`/posts/${id}`),
  })
}

export function useGetTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      return await request<Tag[]>('/tags')
    },
  })
}
