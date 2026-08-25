import { HttpDataProvider } from './httpDataProvider'
import type { DataProvider } from './dataProvider'

export type { ClinicianProfile, DataProvider, LoginResult, UserListFilters } from './dataProvider'
export { ApiError, UnauthorizedError } from './http'

/**
 * Active data source for the whole app, talking to the real server in
 * `server/`. `MockDataProvider` is kept in this folder for reference/tests
 * but is no longer wired in — swapping providers again is still this one
 * line, per the `DataProvider` contract.
 */
export const dataProvider: DataProvider = new HttpDataProvider()
