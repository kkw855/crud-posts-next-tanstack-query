import { z } from 'zod'

export const schema = z.object({
  title: z.string().min(1, { message: 'title is required' }),
  content: z.string().min(1, { message: 'content is required' }),
  tagId: z.string().min(1, { message: 'tag is required' }),
})

export type FormInputPost = z.infer<typeof schema>
