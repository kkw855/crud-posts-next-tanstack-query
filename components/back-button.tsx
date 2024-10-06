'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const BackButton = () => {
  const router = useRouter()

  return (
    <Button onClick={() => router.back()} variant="secondary" size="sm">
      <ChevronLeft className="h-4" />
      Back
    </Button>
  )
}
