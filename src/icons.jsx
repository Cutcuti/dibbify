// Minimal inline SVG icons (Spotify-ish), currentColor-driven.
const S = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor' }

export const IconPlay = () => (<svg {...S}><path d="M8 5v14l11-7z" /></svg>)
export const IconPause = () => (<svg {...S}><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>)
export const IconNext = () => (<svg {...S}><path d="M6 5l8.5 7L6 19V5zM16 5h2.5v14H16z" /></svg>)
export const IconPrev = () => (<svg {...S}><path d="M18 5l-8.5 7L18 19V5zM5.5 5H8v14H5.5z" /></svg>)

export const IconShuffle = () => (
  <svg {...S}><path d="M17 3l4 4-4 4v-3h-2.2l-2.6 3.4 1.9 2.5H17v-3l4 4-4 4v-3h-3.9l-2.6-3.4L7.9 18H3v-2h3.9l2.6-3.4L6.9 8H3V6h4.9l2.6 3.4L12.8 6H17V3z"/></svg>
)
export const IconRepeat = () => (
  <svg {...S}><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>
)
export const IconVolume = () => (
  <svg {...S}><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4zM14 3.2v2.1a7 7 0 010 13.4v2.1a9 9 0 000-17.6z"/></svg>
)
export const IconVolumeMute = () => (
  <svg {...S}><path d="M3 9v6h4l5 5V4L7 9H3zm18.3-.7l-1.4-1.4L17 9.8 14.1 6.9 12.7 8.3 15.6 11.2 12.7 14.1l1.4 1.4L17 12.6l2.9 2.9 1.4-1.4L18.4 11.2z"/></svg>
)
export const IconHome = () => (<svg {...S}><path d="M12 3l9 8h-2v10h-5v-6h-4v6H5V11H3z"/></svg>)
export const IconSearch = () => (
  <svg {...S}><path d="M10 4a6 6 0 104.47 10l4.26 4.26 1.42-1.42L15.9 12.6A6 6 0 0010 4zm0 2a4 4 0 110 8 4 4 0 010-8z"/></svg>
)
export const IconLibrary = () => (
  <svg {...S}><path d="M4 4h2v16H4zM8 4h2v16H8zM13 4l6 1.6-4 14.4-6-1.6z" transform="translate(0,0)"/></svg>
)
export const IconChevronDown = () => (<svg {...S}><path d="M6 9l6 6 6-6z" /></svg>)
export const IconExpand = () => (
  <svg {...S}><path d="M4 4h6v2H6v4H4V4zm10 0h6v6h-2V6h-4V4zM4 14h2v4h4v2H4v-6zm14 0h2v6h-6v-2h4v-4z"/></svg>
)
export const IconHeart = ({ filled }) => (
  filled
    ? <svg {...S}><path d="M12 21s-7.5-4.9-10-9.3C.4 8.4 2 5 5.2 5c2 0 3.3 1.1 4 2.2C9.8 6.1 11.1 5 13.1 5 16.3 5 18 8.4 16.3 11.7 13.9 16.1 12 21 12 21z"/></svg>
    : <svg {...S} fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20s-6.5-4.3-9-8.3C1.7 8.9 3 6 5.5 6c1.8 0 3 1.1 3.6 2.1L12 10l2.9-1.9C15.5 7.1 16.7 6 18.5 6 21 6 22.3 8.9 21 11.7 18.5 15.7 12 20 12 20z"/></svg>
)
