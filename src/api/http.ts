import { getToken, setSession } from './session'

// In production (Vercel), the frontend and the `/api/*` serverless function
// are served from the same origin via vercel.json's rewrite, so the correct
// base URL is '' (relative — fetch('/api/...') hits the same domain). Local
// dev keeps talking to the standalone uvicorn server on :8787 unless
// VITE_API_BASE_URL overrides it either way.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? '' : 'http://localhost:8787')

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

/** Thrown specifically on a 401 — callers that care (route guards) can tell this apart from a generic ApiError. */
export class UnauthorizedError extends ApiError {}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: unknown
  /** Skip attaching the Authorization header — only the login call needs this. */
  skipAuth?: boolean
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {}
  if (options.body !== undefined) headers['content-type'] = 'application/json'

  const token = getToken()
  if (token && !options.skipAuth) headers.authorization = `Bearer ${token}`

  const response = await fetch(`${BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  })

  if (response.status === 401) {
    // The token is missing/expired/invalid — clear the session so the app
    // falls back to the login screen on the next auth check rather than looping.
    setSession(null)
  }

  if (!response.ok) {
    const message = await response
      .json()
      .then((body: { error?: string }) => body.error)
      .catch(() => undefined)
    const ErrorClass = response.status === 401 ? UnauthorizedError : ApiError
    throw new ErrorClass(message || `Request to ${path} failed with ${response.status}`, response.status)
  }

  if (response.status === 204) return undefined as T
  return (await response.json()) as T
}

export const http = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown, options?: Pick<RequestOptions, 'skipAuth'>) =>
    request<T>(path, { method: 'POST', body, ...options }),
  patch: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PATCH', body }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}
