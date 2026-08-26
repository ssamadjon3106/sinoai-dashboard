import { StaticDataProvider } from './staticDataProvider'
import type { DataProvider } from './dataProvider'

export type { ClinicianProfile, DataProvider, LoginResult, UserListFilters } from './dataProvider'
export { ApiError, UnauthorizedError } from './http'

/**
 * Active data source for the investor demo build (`demo/static` branch
 * only). Zero network calls, zero backend — see StaticDataProvider for the
 * in-memory implementation seeded from the 12 demo workers. `main` keeps
 * using HttpDataProvider against the real server; this branch exists solely
 * to swap this one line plus vercel.json/.vercelignore below.
 */
export const dataProvider: DataProvider = new StaticDataProvider()
