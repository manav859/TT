import { useQuery } from '@tanstack/react-query'
import { getServices, getService } from '@/lib/api/endpoints'
import type { ServicesData, ServiceDetail } from '@/types/api'

export function useServices() {
  return useQuery<ServicesData>({
    queryKey: ['services'],
    queryFn: getServices,
    staleTime: 1000 * 60 * 10,
  })
}

export function useService(slug: string) {
  return useQuery<ServiceDetail>({
    queryKey: ['service', slug],
    queryFn: () => getService(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 10,
  })
}
