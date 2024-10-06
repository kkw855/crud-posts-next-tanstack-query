'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { ClipLoader } from 'react-spinners'
import { Pencil, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { request } from '@/api'

type Prop = Readonly<{
  id: string
}>

export const ButtonAction = (props: Prop) => {
  const { id } = props

  const router = useRouter()

  const {
    mutate: deletePost,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async () => await request(`/posts/${id}`, { method: 'DELETE' }),
    onError: (error: Error) => {
      console.error(error)
    },
    onSuccess: () => {
      router.push('/')
      router.refresh()
    },
  })

  return (
    <div className="flex gap-4">
      <Button variant="secondary" size="sm" asChild>
        <Link href={`/edit/${id}`}>
          <Pencil className="mr-1 h-4" />
          EDIT
        </Link>
      </Button>

      <Button
        variant="destructive"
        size="sm"
        onClick={() => deletePost()}
        disabled={isPending || isSuccess}
      >
        {isPending || isSuccess ? (
          <ClipLoader loading speedMultiplier={1} size={18} className="mr-1" />
        ) : (
          <Trash className="mr-1 h-4" />
        )}
        DELETE
      </Button>
    </div>
  )
}
