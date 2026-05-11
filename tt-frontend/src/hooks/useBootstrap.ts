import { useQuery } from '@tanstack/react-query'
import { getBootstrap } from '@/lib/api/endpoints'
import type { BootstrapData } from '@/types/api'

export function useBootstrap() {
  return useQuery<BootstrapData>({
    queryKey: ['bootstrap'],
    queryFn: getBootstrap,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 2,
  })
}
