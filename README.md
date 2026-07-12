# 🎵 Soundwave

A Spotify-style, single-playlist music player. Dark theme, green accents,
play/pause, next/prev, seek, volume, shuffle, and repeat. Built with React + Vite,
ready to deploy on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Add your songs

1. Drop your audio files into `public/audio/` (e.g. `track1.mp3`).
2. Drop cover images into `public/covers/` (e.g. `track1.jpg`). Square images look best.
3. Edit `src/data.js` — set the `title`, `artist`, `album`, `cover`, and `src`
   for each of the 5 tracks (and the playlist title/cover at the top).

Missing files are handled gracefully: covers fall back to a gradient, and a track
with no audio simply can't be played — no crashes.

## Deploy to Vercel

- **Easiest:** push this folder to a GitHub repo, then "Import Project" at
  [vercel.com/new](https://vercel.com/new). Vercel auto-detects Vite — no config needed.
- **Or via CLI:**
  ```bash
  npm i -g vercel
  vercel        # preview deploy
  vercel --prod # production deploy
  ```

## Tech

- React 18 + Vite 5
- No external UI libraries — all icons and styling are hand-rolled.
