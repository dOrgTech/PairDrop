'use client'
import { FC, ReactNode } from 'react'
import axios from 'axios'
import { SWRConfig } from 'swr'

export const fetcher = async (url: string, method: string, data: any = null, auth?: string) => {
  const headers = auth ? { auth: auth } : {}

  if (method === 'GET') {
    const response = await axios.get(url, { headers })
    return response.data
  } else if (method === 'POST') {
    const response = await axios.post(url, data, { headers })
    return response.data
  } else if (method === 'PATCH') {
    const response = await axios.patch(url, data, { headers })
    return response.data
  }
}

export const SWRProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
}
