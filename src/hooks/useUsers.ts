import { dataProvider } from '@/api'
import type { UserListFilters } from '@/api'
import { useAsync } from './useAsync'

export function useUsers(filters: UserListFilters) {
  return useAsync(
    () => dataProvider.getUsers(filters),
    [filters.search, filters.riskBand, filters.sex],
  )
}
