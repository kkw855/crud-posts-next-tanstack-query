'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

import { schema, FormInputPost } from '@/app/schema'
import { useGetTags } from '@/api/queries'
import { ClipLoader } from 'react-spinners'

type Prop = {
  onSubmit: SubmitHandler<FormInputPost>
  isEditing: boolean
  isLoadingSubmit: boolean
  initialValues?: FormInputPost
}

export const PostForm = (props: Prop) => {
  const {
    onSubmit,
    isEditing,
    isLoadingSubmit,
    initialValues = {
      title: '',
      content: '',
      tagId: '',
    },
  } = props

  const {
    data: dataTags,
    isPending: isPendingTags,
    isError: isErrorTags,
  } = useGetTags()

  const form = useForm<FormInputPost>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  })

  const { control, handleSubmit } = form

  const title = isEditing ? 'Edit post' : 'Add new post'

  if (isErrorTags) throw new Error()

  return (
    <Form {...form}>
      <h1 className="text-center text-2xl font-bold">{title}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-1/2 flex-col gap-4 p-8"
      >
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="post title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="post content..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="tagId"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPendingTags}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={isPendingTags ? 'Loading...' : 'Select tags'}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {dataTags?.map(({ id, name }) => (
                    <SelectItem key={id} value={id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
                <FormMessage />
              </Select>
            </FormItem>
          )}
        />
        {/* TODO: Loading */}
        <Button disabled={isLoadingSubmit}>
          {Boolean(isLoadingSubmit) && (
            <ClipLoader
              loading
              speedMultiplier={1}
              size={18}
              className="mr-1"
            />
          )}
          {isEditing ? 'Update' : 'Create'}
        </Button>
      </form>
    </Form>
  )
}
