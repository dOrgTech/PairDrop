import { useEffect } from 'react'
import useSWR from 'swr'
import { fetcher } from '@/providers/swr'
import { addressType } from '@/types'

const useAuth = (address: addressType): string => {
  return typeof window !== 'undefined' && address ? localStorage.getItem(`auth_${address.toLowerCase()}`) || '' : ''
}

const useCustomSWR = (address: addressType, url: string, refetch?: boolean) => {
  const auth = useAuth(address)
  const shouldFetch = address && auth
  const { data, error, mutate } = useSWR(shouldFetch ? url : null, (u) => fetcher(u, 'GET', null, auth))

  useEffect(() => {
    if (shouldFetch) {
      mutate()
    }
  }, [refetch, mutate])

  return { data, isLoading: !error && !data, isError: error }
}

// Retrieves the list of projects (GET: /projects)
export function useProjectsData() {
  const { data, error } = useSWR('api/projects', (url) => fetcher(url, 'GET'))

  return {
    projectsData: data,
    isProjectsLoading: !error && !data,
    isProjectsError: error,
  }
}

// Retrieves user score data (GET: /user/score)
export function useMyScoreData(address: addressType, refetch?: boolean) {
  const { data, isLoading, isError } = useCustomSWR(address, 'api/user/score', refetch)

  return {
    myScoreData: data,
    isMyScoreLoading: isLoading,
    isMyScoreError: isError,
  }
}

// Retrieves user votes data (GET: /user/votes)
export function useMyVotesData(address: addressType, refetch?: boolean) {
  const { data, isLoading, isError } = useCustomSWR(address, 'api/user/votes', refetch)

  return {
    myVotesData: data,
    isMyVotesLoading: isLoading,
    isMyVotesError: isError,
  }
}

// Generates and retrieves a random projects pair (GET: /user/get-random-project-pair)
export function usePairData(address: addressType, shouldFetch: boolean, refetch?: boolean, editPairIndex?: number) {
  const { data, isLoading, isError } = useCustomSWR(
    shouldFetch ? address : undefined,
    `api/user/get-random-project-pair${editPairIndex ? `?pairIndex=${editPairIndex}` : ''}`,
    refetch,
  )

  return {
    pairData: data,
    isPairLoading: isLoading,
    isPairError: isError,
  }
}

// Votes for a project in a random pair (POST: /user/vote)
export function useVote(address: addressType, votedProjectId: number | null) {
  const auth = useAuth(address)
  const postData = async () => {
    return await fetcher('api/user/vote', 'POST', { votedProjectId }, auth)
  }

  return { vote: postData }
}

// Updates the vote for a specific project pair (PATCH: /user/vote)
export function useUpdateVote(
  address: addressType,
  firstProjectId: number | null,
  secondProjectId: number | null,
  votedProjectId: number | null,
) {
  const auth = useAuth(address)
  const postData = async () => {
    return await fetcher('api/user/vote', 'PATCH', { firstProjectId, secondProjectId, votedProjectId }, auth)
  }

  return { updateVote: postData }
}
