const TOKEN_ENDPOINT = import.meta.env.VITE_TOKEN_ENDPOINT as string

export async function fetchToken(roomId: string, identity: string): Promise<string> {
  const res = await fetch(
    `${TOKEN_ENDPOINT}?room=${encodeURIComponent(roomId)}&identity=${encodeURIComponent(identity)}`,
  )
  if (!res.ok) throw new Error(`Token request failed: ${res.status}`)

  const data = (await res.json()) as Record<string, unknown>
  const token = (data.accessToken ?? data.token) as string | undefined
  if (!token) throw new Error('No token in server response')

  return token
}
