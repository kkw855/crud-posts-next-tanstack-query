'use server'

import { Config, Effect } from 'effect'

const BASE_URL = Effect.runSync(Config.string('BASE_URL'))

// Make the `request` function generic
// to specify the return data type:
export async function request<TResponse>(
  url: string,
  // `RequestInit` is a type for configuring
  // a `fetch` request. By default, an empty object.
  config: RequestInit = { method: 'GET' },

  // This function is async, it will return a Promise:
): Promise<TResponse> {
  // Inside, we call the `fetch` function with
  // a URL and config given:
  const response = await fetch(`${BASE_URL}${url}`, config)

  // When got a response call a `json` method on it and return the result data.
  // TODO: response body 존재 유무 확인 이후에 json() 호출
  return (await response.json()) as TResponse

  // We also can use some post-response
  // data-transformations in the last `then` clause.
}
