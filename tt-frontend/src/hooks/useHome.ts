import { useQuery } from '@tanstack/react-query'
import { getHome } from '@/lib/api/endpoints'
import type { HomeData } from '@/types/api'

export function useHome() {
  return useQuery<HomeData>({
    queryKey: ['home'],
    queryFn: getHome,
    staleTime: 1000 * 60 * 10,
  })
}
