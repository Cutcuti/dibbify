# 🎵 Dibbify

A Spotify-style music player for one playlist — **Probiotic's Songs? 🫠**.
Dark theme, green accents, play/pause, next/prev, seek, volume, shuffle,
repeat, and a full-screen "Now Playing" view with an ambient backdrop
sampled from the current cover art. Built with React + Vite, deployed on
Vercel.

**Live:** [dibbify-music.vercel.app](https://dibbify-music.vercel.app)

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## The playlist

Tracks live in [`src/data.js`](src/data.js) — title, artist, album, cover,
and audio source for each song. Audio files go in `public/audio/`, cover
images in `public/covers/`. A track missing its cover falls back to a
gradient, and a track missing audio simply can't be played — no crashes.

## Deploy to Vercel

Pushing to `main` deploys automatically once the project is linked to this
repo on Vercel. To deploy by hand instead:

```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

## Tech

- React 18 + Vite 5
- No external UI libraries — all icons and styling are hand-rolled.
