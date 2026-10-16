/**
 * Pexels stock footage (free to use under the Pexels licence).
 * Used only as quiet, silent background footage in two heroes (restaurant, gym).
 * Hotlinked from Pexels' CDN so nothing heavy lives in the repo.
 * For production, download each file into /public/video and point `src` there.
 */
export interface Clip { src: string; label: string }

export const CLIPS = {
  /** Restaurant hero: cozy modern restaurant interior at night (pexels.com/video/31631562) */
  rest2: {
    src: 'https://videos.pexels.com/video-files/31631562/13476219_1280_720_25fps.mp4',
    label: 'A cozy modern restaurant interior at night',
  },
  /** Gym hero: back pull exercise in a dark gym (pexels.com/video/35585700) */
  gym1: {
    src: 'https://videos.pexels.com/video-files/35585700/15079793_720_1280_30fps.mp4',
    label: 'An athlete performing a back pull exercise in a dark gym',
  },
} as const satisfies Record<string, Clip>
