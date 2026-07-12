import { useEffect, useRef, useState, useCallback } from 'react'
import { playlist } from './data.js'
import {
  IconPlay, IconPause, IconNext, IconPrev, IconShuffle, IconRepeat,
  IconVolume, IconVolumeMute, IconHome, IconSearch, IconLibrary, IconHeart,
} from './icons.jsx'

const fmt = (s) => {
  if (!s || Number.isNaN(s) || !Number.isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

// Deterministic gradient placeholder when a cover image is missing.
const gradientFor = (id) => {
  const hues = [
    ['#450af5', '#8e8ee5'],
    ['#1e3264', '#3f7f6f'],
    ['#8d67ab', '#e8115b'],
    ['#e8115b', '#f59b23'],
    ['#158a08', '#a0c3d2'],
  ]
  const [a, b] = hues[id % hues.length]
  return `linear-gradient(135deg, ${a}, ${b})`
}

function Cover({ track, className }) {
  const [broken, setBroken] = useState(false)
  const showImg = track.cover && !broken
  return (
    <div className={`cover ${className || ''}`} style={{ background: gradientFor(track.id) }}>
      {showImg && (
        <img src={track.cover} alt="" onError={() => setBroken(true)} />
      )}
    </div>
  )
}

export default function App() {
  const audioRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState('off') // off | all | one
  const [liked, setLiked] = useState(() => new Set())

  const tracks = playlist.tracks
  const track = tracks[current]
  const hasAudio = Boolean(track?.src)

  const pickNext = useCallback(() => {
    if (shuffle && tracks.length > 1) {
      let n = current
      while (n === current) n = Math.floor(Math.random() * tracks.length)
      return n
    }
    return (current + 1) % tracks.length
  }, [shuffle, current, tracks.length])

  const goNext = useCallback(() => setCurrent(pickNext()), [pickNext])
  const goPrev = useCallback(() => {
    const a = audioRef.current
    if (a && a.currentTime > 3) { a.currentTime = 0; return }
    setCurrent((c) => (c - 1 + tracks.length) % tracks.length)
  }, [tracks.length])

  const selectTrack = (i) => {
    if (i === current) { togglePlay(); return }
    setCurrent(i)
    setPlaying(true)
  }

  const togglePlay = () => {
    if (!hasAudio) return
    setPlaying((p) => !p)
  }

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // Sync play/pause with the <audio> element.
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    if (playing && hasAudio) {
      a.play().catch(() => setPlaying(false))
    } else {
      a.pause()
    }
  }, [playing, current, hasAudio])

  // Load new source when track changes.
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    setProgress(0)
    setDuration(0)
    a.load()
    if (playing && hasAudio) a.play().catch(() => setPlaying(false))
  }, [current]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const a = audioRef.current
    if (a) a.volume = muted ? 0 : volume
  }, [volume, muted])

  const onEnded = () => {
    if (repeat === 'one') {
      const a = audioRef.current
      a.currentTime = 0
      a.play().catch(() => {})
      return
    }
    const isLast = current === tracks.length - 1
    if (isLast && repeat === 'off' && !shuffle) { setPlaying(false); return }
    goNext()
  }

  const onSeek = (e) => {
    const a = audioRef.current
    const t = Number(e.target.value)
    if (a) a.currentTime = t
    setProgress(t)
  }

  const pct = duration ? (progress / duration) * 100 : 0

  return (
    <div className="app">
      <div className="grid">
        {/* ── Sidebar ───────────────────────────────── */}
        <aside className="sidebar">
          <div className="brand">
            <span className="brand-dot" />
            Dibbify
          </div>
          <nav className="nav">
            <a className="nav-item active"><IconHome /> Home</a>
            <a className="nav-item"><IconSearch /> Search</a>
          </nav>
          <div className="library-card">
            <div className="library-head"><IconLibrary /> Your Library</div>
            <button className="lib-playlist active">
              <div className="cover sm" style={{ background: gradientFor(0) }}>
                {playlist.cover && <img src={playlist.cover} alt="" onError={(e) => (e.target.style.display = 'none')} />}
              </div>
              <div className="lib-meta">
                <span className="lib-title">{playlist.title}</span>
                <span className="lib-sub">Playlist · {tracks.length} songs</span>
              </div>
            </button>
          </div>
        </aside>

        {/* ── Main ──────────────────────────────────── */}
        <main className="main">
          <header className="hero">
            <div className="cover xl" style={{ background: gradientFor(0) }}>
              {playlist.cover && <img src={playlist.cover} alt="" onError={(e) => (e.target.style.display = 'none')} />}
            </div>
            <div className="hero-meta">
              <span className="eyebrow">Playlist</span>
              <h1>{playlist.title}</h1>
              <p className="hero-sub">{playlist.subtitle}</p>
            </div>
          </header>

          <div className="controls-row">
            <button className="play-fab" onClick={togglePlay} disabled={!hasAudio} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? <IconPause /> : <IconPlay />}
            </button>
            <button className={`ghost-btn ${shuffle ? 'on' : ''}`} onClick={() => setShuffle((s) => !s)} aria-label="Shuffle">
              <IconShuffle />
            </button>
          </div>

          <div className="track-list">
            <div className="track-head">
              <span>#</span>
              <span>Title</span>
              <span className="col-album">Album</span>
              <span className="col-time">🕐</span>
            </div>
            {tracks.map((t, i) => {
              const isCur = i === current
              return (
                <div
                  key={t.id}
                  className={`track-row ${isCur ? 'current' : ''}`}
                  onDoubleClick={() => selectTrack(i)}
                >
                  <div className="col-index" onClick={() => selectTrack(i)}>
                    {isCur && playing
                      ? <span className="eq"><i /><i /><i /></span>
                      : <><span className="idx">{i + 1}</span><span className="row-play"><IconPlay /></span></>}
                  </div>
                  <div className="col-title">
                    <Cover track={t} className="sm" />
                    <div className="tmeta">
                      <span className={`t-name ${isCur ? 'green' : ''}`}>{t.title}</span>
                      <span className="t-artist">{t.artist}</span>
                    </div>
                  </div>
                  <div className="col-album">{t.album}</div>
                  <div className="col-time">
                    <button
                      className={`heart ${liked.has(t.id) ? 'on' : ''}`}
                      onClick={() => toggleLike(t.id)}
                      aria-label="Like"
                    ><IconHeart filled={liked.has(t.id)} /></button>
                    <span>{isCur && duration ? fmt(duration) : (t.duration ? fmt(t.duration) : '—:—')}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="hint">Drop your files in <code>public/audio/</code> &amp; <code>public/covers/</code>, then edit <code>src/data.js</code>.</p>
        </main>
      </div>

      {/* ── Now Playing Bar ─────────────────────────── */}
      <footer className="now-bar">
        <div className="np-left">
          <Cover track={track} className="md" />
          <div className="np-meta">
            <span className="np-title">{track.title}</span>
            <span className="np-artist">{track.artist}</span>
          </div>
          <button
            className={`heart ${liked.has(track.id) ? 'on' : ''}`}
            onClick={() => toggleLike(track.id)}
            aria-label="Like"
          ><IconHeart filled={liked.has(track.id)} /></button>
        </div>

        <div className="np-center">
          <div className="np-buttons">
            <button className={`ghost-btn sm ${shuffle ? 'on' : ''}`} onClick={() => setShuffle((s) => !s)} aria-label="Shuffle"><IconShuffle /></button>
            <button className="ghost-btn" onClick={goPrev} aria-label="Previous"><IconPrev /></button>
            <button className="play-fab sm" onClick={togglePlay} disabled={!hasAudio} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? <IconPause /> : <IconPlay />}
            </button>
            <button className="ghost-btn" onClick={goNext} aria-label="Next"><IconNext /></button>
            <button
              className={`ghost-btn sm ${repeat !== 'off' ? 'on' : ''}`}
              onClick={() => setRepeat((r) => (r === 'off' ? 'all' : r === 'all' ? 'one' : 'off'))}
              aria-label="Repeat"
            >
              <IconRepeat />{repeat === 'one' && <span className="repeat-one">1</span>}
            </button>
          </div>
          <div className="seek">
            <span className="time">{fmt(progress)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={progress}
              step="0.1"
              onChange={onSeek}
              style={{ '--pct': `${pct}%` }}
              disabled={!hasAudio}
            />
            <span className="time">{fmt(duration)}</span>
          </div>
        </div>

        <div className="np-right">
          <button className="ghost-btn sm" onClick={() => setMuted((m) => !m)} aria-label="Mute">
            {muted || volume === 0 ? <IconVolumeMute /> : <IconVolume />}
          </button>
          <input
            className="vol"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={muted ? 0 : volume}
            onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false) }}
            style={{ '--pct': `${(muted ? 0 : volume) * 100}%` }}
          />
        </div>
      </footer>

      <audio
        ref={audioRef}
        src={track.src || undefined}
        onTimeUpdate={(e) => setProgress(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={onEnded}
        preload="metadata"
      />
    </div>
  )
}
