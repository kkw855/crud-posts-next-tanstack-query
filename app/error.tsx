'use client'

import { Button } from '@/components/ui/button'

export default function GlobalError(props: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { error, reset } = props

  console.error(error)

  return (
    <div>
      <h2>Oops! Something went wrong.</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
