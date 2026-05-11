import { useQuery } from '@tanstack/react-query'
import { getWorks, getWork } from '@/lib/api/endpoints'
import type { WorksData, WorkDetail } from '@/types/api'

export function useWorks() {
  return useQuery<WorksData>({
    queryKey: ['works'],
    queryFn: getWorks,
    staleTime: 1000 * 60 * 10,
  })
}

export function useWork(slug: string) {
  return useQuery<WorkDetail>({
    queryKey: ['work', slug],
    queryFn: () => getWork(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 10,
  })
}
