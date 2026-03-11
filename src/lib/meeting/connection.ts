import { Room, VideoPresets } from 'livekit-client'

const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL as string

export function createRoom(): Room {
  return new Room({
    adaptiveStream: true,
    dynacast: true,
    videoCaptureDefaults: {
      resolution: VideoPresets.h720.resolution,
    },
  })
}

export async function connectRoom(room: Room, token: string): Promise<void> {
  await room.connect(LIVEKIT_URL, token)
}

export function disconnectRoom(room: Room): void {
  room.disconnect()
}
