import Link from 'next/link'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { Post } from '@/types'

type Prop = Readonly<{ post: Post }>

export const PostCard = (props: Prop) => {
  const { id, title, content, tag } = props.post

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content.slice(0, 80)}</CardContent>
      <CardFooter className="flex justify-between">
        <Badge>{tag.name}</Badge>
        <Button asChild variant="ghost">
          <Link href={`/blog/${id}`}>Read more...</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
