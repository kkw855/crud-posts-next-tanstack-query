import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { BookOpenCheck } from 'lucide-react'

export const NavBar = () => {
  return (
    <nav className="flex bg-neutral-100 p-4">
      <div className="flex flex-1 items-center justify-center">
        <BookOpenCheck className="text-blue-500" />
      </div>
      <div className="flex-1 text-center">
        <Button variant="outline" asChild>
          <Link href="/create">Create POST</Link>
        </Button>
      </div>
    </nav>
  )
}
