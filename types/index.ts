export type Post = Readonly<{
  id: string
  title: string
  content: string
  tag: Tag
}>

export type Tag = Readonly<{
  id: string
  name: string
}>
