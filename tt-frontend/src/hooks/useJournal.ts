import { useQuery } from '@tanstack/react-query'
import { getJournal, getJournalPost } from '@/lib/api/endpoints'
import type { JournalData, JournalDetail } from '@/types/api'

export function useJournal(page = 1) {
  return useQuery<JournalData>({
    queryKey: ['journal', page],
    queryFn: () => getJournal(page),
    staleTime: 1000 * 60 * 10,
  })
}

export function useJournalPost(slug: string) {
  return useQuery<JournalDetail>({
    queryKey: ['journal-post', slug],
    queryFn: () => getJournalPost(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 10,
  })
}
