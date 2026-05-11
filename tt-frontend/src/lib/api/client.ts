import type { ApiEnvelope, ApiErrorShape } from '@/types/api'
import { ApiError } from '@/types/api'

const BASE_URL = import.meta.env.VITE_WP_API_BASE_URL as string
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const API_PREFIX = '/wp-json/tt/v1'

function buildUrl(path: string): string {
  return `${BASE_URL}${API_PREFIX}/${path.replace(/^\//, '')}`
}

async function loadMock<T>(path: string): Promise<T> {
  const key = path.replace(/^\//, '').replace(/\//g, '-')
  const modules = import.meta.glob('./mock/*.json', { eager: true })
  const mod = modules[`./mock/${key}.json`] as { default: ApiEnvelope<T> } | undefined
  if (!mod) {
    throw new ApiError(`Mock not found for: ${key}`, 'tt_mock_not_found', 404)
  }
  const envelope = mod.default
  if (!envelope.success) {
    const err = envelope as unknown as ApiErrorShape
    throw new ApiError(err.message, err.code, err.data?.status ?? 500)
  }
  return envelope.data
}

async function get<T>(path: string): Promise<T> {
  if (USE_MOCK) return loadMock<T>(path)

  let res: Response
  try {
    res = await fetch(buildUrl(path), {
      headers: { 'Accept': 'application/json' },
    })
  } catch (e) {
    if (import.meta.env.DEV) {
      console.warn(`[TT API] Network error fetching ${path}:`, e)
    }
    throw new ApiError('Network error — is WordPress running?', 'tt_network_error', 0)
  }

  let body: unknown
  try {
    body = await res.json()
  } catch {
    throw new ApiError('Invalid JSON response', 'tt_json_error', res.status)
  }

  const envelope = body as ApiEnvelope<T> | ApiErrorShape
  if (!res.ok || !envelope.success) {
    const err = envelope as ApiErrorShape
    if (import.meta.env.DEV) {
      console.warn(`[TT API] Error ${res.status} on ${path}:`, err)
    }
    throw new ApiError(
      err.message ?? `HTTP ${res.status}`,
      err.code ?? 'tt_unknown',
      (err.data as { status?: number })?.status ?? res.status,
      (err.data as { fields?: Record<string, string> })?.fields,
    )
  }

  return (envelope as ApiEnvelope<T>).data
}

async function post<T>(path: string, payload: unknown): Promise<T> {
  let res: Response
  try {
    res = await fetch(buildUrl(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (e) {
    if (import.meta.env.DEV) {
      console.warn(`[TT API] Network error posting ${path}:`, e)
    }
    throw new ApiError('Network error', 'tt_network_error', 0)
  }

  let body: unknown
  try {
    body = await res.json()
  } catch {
    throw new ApiError('Invalid JSON response', 'tt_json_error', res.status)
  }

  const envelope = body as ApiEnvelope<T> | ApiErrorShape
  if (!res.ok || !envelope.success) {
    const err = envelope as ApiErrorShape
    throw new ApiError(
      err.message ?? `HTTP ${res.status}`,
      err.code ?? 'tt_unknown',
      (err.data as { status?: number })?.status ?? res.status,
      (err.data as { fields?: Record<string, string> })?.fields,
    )
  }

  return (envelope as ApiEnvelope<T>).data
}

export const apiClient = { get, post }
