import { dataProvider } from '@/api'
import { useAsync } from './useAsync'

export function useOverviewStats() {
  return useAsync(() => dataProvider.getOverviewStats(), [])
}
