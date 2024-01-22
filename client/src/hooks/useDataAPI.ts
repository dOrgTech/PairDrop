import { useEffect } from 'react'
import useSWR from 'swr'
import { fetcher } from '@/providers/swr'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function useProjectsData() {
  // const { data, error } = useSWR(`${API_URL}/projects`, (url) => fetcher(url, 'GET'))
  const { data, error } = useSWR(`/projects.json`, (url) => fetcher(url, 'GET'))

  return {
    projectsData: data,
    isProjectsLoading: !error && !data,
    isProjectsError: error,
  }
}

export function usePairData(refetch: boolean) {
  const auth = typeof window !== 'undefined' ? localStorage.getItem('auth') || '' : ''
  const { data, error, mutate } = useSWR(`${API_URL}/user/get-random-project-pair`, (url) =>
    fetcher(url, 'GET', null, auth),
  )

  useEffect(() => {
    mutate()
  }, [refetch, mutate])

  return {
    pairData: data,
    isPairLoading: !error && !data,
    isPairError: error,
  }
}

export function useVote(votedProjectId: number | null) {
  const auth = typeof window !== 'undefined' ? localStorage.getItem('auth') || '' : ''
  const postData = async () => {
    return await fetcher(`${API_URL}/user/vote`, 'POST', { votedProjectId }, auth)
  }

  return { vote: postData }
}
