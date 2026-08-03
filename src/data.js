// ─────────────────────────────────────────────────────────────
// Dibbify playlist. Audio lives in  public/audio/ , covers in
// public/covers/. `cover` can stay pointing at a missing file —
// the UI shows a gradient placeholder until the image is added.
// ─────────────────────────────────────────────────────────────

export const playlist = {
  title: 'Probiotic’s Songs? 🫠',
  subtitle: 'Protik’s picks · 6 songs',
  cover: '/covers/albumcover.jpg', // playlist header / album art
  tracks: [
    {
      id: 1,
      title: 'Tere Pass Mai',
      artist: 'Protik',
      album: 'Probiotic’s Songs? 🫠',
      duration: 0, // auto-filled from the audio once loaded
      cover: '/covers/tere-pass-mai.jpg', // pagdi (navy) photo
      src: '/audio/tere-pass-mai.m4a',
    },
    {
      id: 2,
      title: 'Hin Dil Ju',
      artist: 'Protik',
      album: 'Probiotic’s Songs? 🫠',
      duration: 0,
      cover: '/covers/hin-dil-ju.jpg', // red-cap (white kurta) photo
      src: '/audio/hin-dil-ju.m4a',
    },
    {
      id: 3,
      title: 'Alag Aasmaan',
      artist: 'Protik',
      album: 'Probiotic’s Songs? 🫠',
      duration: 0,
      cover: '/covers/alag-aasmaan.jpg', // varsity jacket / sunset photo
      src: '/audio/alag-aasmaan.mp3',
    },
    {
      id: 4,
      title: 'Photograph',
      artist: 'Protik',
      album: 'Probiotic’s Songs? 🫠',
      duration: 0,
      cover: '/covers/photograph.png', // guitar / sunset photo
      src: '/audio/photograph.mp3',
    },
    {
      id: 5,
      title: 'Daisy Tune 💛',
      artist: 'Dibs',
      album: 'Probiotic’s Songs? 🫠',
      duration: 0,
      cover: '/covers/daisy.webp', // daisy flower
      src: '/audio/daisy-tune.m4a',
    },
    {
      id: 6,
      title: 'Amnesia',
      artist: 'Protik',
      album: 'Probiotic’s Songs? 🫠',
      duration: 0,
      cover: '', // TODO: add cover to public/covers/ once uploaded
      src: '', // TODO: add audio to public/audio/ once uploaded
    },
  ],
}
