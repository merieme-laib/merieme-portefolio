import { useEffect, useRef, useState } from 'react';
import roomImage from '../assets/room.png';
import roomNightImage from '../assets/room-night.png';
import { Character } from './Character';
import { Hotspot } from './Hotspot';
import { InteractionMenu, type ModalContent } from './InteractionMenu';
import { Modal } from './Modal';
import { MusicPlayer } from './MusicPlayer';
import { NavigationDebugOverlay } from './NavigationDebugOverlay';
import { DEBUG_NAVIGATION } from '../data/navigation';
import { hotspots, initialCharacterPosition, type Hotspot as HotspotType } from '../data/hotspots';
import { musicTracks } from '../data/portfolioContent';
import {
  translations,
  type Language,
  type MusicMessageKey,
} from '../data/translations';
import {
  cellToPercent,
  findPath,
  percentToCell,
  type GridCell,
} from '../utils/pathfinding';

const STEP_DURATION_MS = 130;

export function GameScene() {
  const movementTimers = useRef<number[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [characterPosition, setCharacterPosition] = useState(initialCharacterPosition);
  const [visibleMenu, setVisibleMenu] = useState<HotspotType | null>(null);
  const [isWalking, setIsWalking] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const [debugHotspots, setDebugHotspots] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [currentPath, setCurrentPath] = useState<GridCell[]>([]);
  const [musicTrackIndex, setMusicTrackIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.45);
  const [musicMessage, setMusicMessage] = useState<MusicMessageKey>('choose');

  const t = translations[language];

  useEffect(() => {
    return () => clearMovementTimers();
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        language === 'fr'
          ? 'Portfolio interactif point-and-click en pixel art de Merieme Laib.'
          : 'Merieme Laib’s interactive point-and-click pixel art portfolio.',
      );
  }, [language, t.title]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    setIsMusicPlaying(false);
    setMusicMessage('ready');
  }, [musicTrackIndex]);

  const handleHotspotSelect = (hotspot: HotspotType) => {
    setModalContent(null);
    setVisibleMenu(null);
    moveCharacterTo(hotspot.characterTarget, hotspot);
  };

  const handleStageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const destination = {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    };

    setModalContent(null);
    setVisibleMenu(null);
    moveCharacterTo(destination);
  };

  const moveCharacterTo = (destination: typeof characterPosition, hotspotToOpen?: HotspotType) => {
    clearMovementTimers();

    const path = findPath(percentToCell(characterPosition), percentToCell(destination));

    if (path.length === 0) {
      setCurrentPath([]);
      setIsWalking(false);
      return;
    }

    setCurrentPath(path);

    const pathPoints = path.slice(1).map(cellToPercent);

    if (pathPoints.length === 0) {
      setIsWalking(false);
      if (hotspotToOpen) {
        setVisibleMenu(hotspotToOpen);
      }
      return;
    }

    setIsWalking(true);

    pathPoints.forEach((point, index) => {
      const timer = window.setTimeout(() => {
        setCharacterPosition(point);
      }, index * STEP_DURATION_MS);

      movementTimers.current.push(timer);
    });

    const endTimer = window.setTimeout(() => {
      setIsWalking(false);
      if (hotspotToOpen) {
        setVisibleMenu(hotspotToOpen);
      }
    }, pathPoints.length * STEP_DURATION_MS);

    movementTimers.current.push(endTimer);
  };

  const handleSleep = () => {
    setIsSleeping(true);
    window.setTimeout(() => setIsSleeping(false), 2000);
  };

  const toggleMusicPlayback = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isMusicPlaying) {
      audio.pause();
      setIsMusicPlaying(false);
      setMusicMessage('paused');
      return;
    }

    try {
      await audio.play();
      setIsMusicPlaying(true);
      setMusicMessage('playing');
    } catch {
      setIsMusicPlaying(false);
      setMusicMessage('missing');
    }
  };

  const clearMovementTimers = () => {
    movementTimers.current.forEach((timer) => window.clearTimeout(timer));
    movementTimers.current = [];
  };

  const showNavigationDebug = DEBUG_NAVIGATION || debugHotspots;
  const currentTrack = musicTracks[musicTrackIndex];

  return (
    <main className="app-shell">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onEnded={() => {
          setIsMusicPlaying(false);
          setMusicMessage('ended');
        }}
        onError={() => {
          setIsMusicPlaying(false);
          setMusicMessage('error');
        }}
      />

      <header className="top-bar">
        <div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <div className="display-toggles">
          <label className="language-control">
            <span>{t.language}</span>
            <select
              value={language}
              onChange={(event) => {
                setLanguage(event.target.value as Language);
                setModalContent(null);
              }}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </label>
          <label className="display-toggle">
            <input
              type="checkbox"
              checked={debugHotspots}
              onChange={(event) => setDebugHotspots(event.target.checked)}
            />
            {t.debug}
          </label>
          <label className="display-toggle">
            <input
              type="checkbox"
              checked={isNightMode}
              onChange={(event) => setIsNightMode(event.target.checked)}
            />
            {t.nightMode}
          </label>
        </div>
      </header>

      <section className="room-frame" aria-label={isNightMode ? t.roomNightAlt : t.roomAlt}>
        <div className="room-stage" onClick={handleStageClick}>
          <img
            className="room-image"
            src={isNightMode ? roomNightImage : roomImage}
            alt={isNightMode ? t.roomNightAlt : t.roomAlt}
          />

          {showNavigationDebug && <NavigationDebugOverlay path={currentPath} />}

          {hotspots.map((hotspot) => (
            <Hotspot
              key={hotspot.id}
              hotspot={hotspot}
              label={t.hotspots[hotspot.id as keyof typeof t.hotspots]}
              interactWithLabel={t.interactWith}
              debug={debugHotspots}
              onSelect={handleHotspotSelect}
            />
          ))}

          <Character
            position={characterPosition}
            isWalking={isWalking}
            isNightMode={isNightMode}
            ariaLabel={t.characterLabel}
          />

          {visibleMenu && (
            <InteractionMenu
              hotspot={visibleMenu}
              language={language}
              translations={t}
              onClose={() => setVisibleMenu(null)}
              onSleep={handleSleep}
              onOpenModal={setModalContent}
              musicPlayer={
                <MusicPlayer
                  trackIndex={musicTrackIndex}
                  isPlaying={isMusicPlaying}
                  volume={musicVolume}
                  message={t.musicMessages[musicMessage]}
                  translations={t}
                  language={language}
                  onSelectTrack={setMusicTrackIndex}
                  onTogglePlayback={toggleMusicPlayback}
                  onVolumeChange={setMusicVolume}
                />
              }
            />
          )}

          {isSleeping && (
            <div className="sleep-overlay" role="status" aria-live="polite">
              <span>Zzz...</span>
            </div>
          )}
        </div>
      </section>

      {modalContent && (
        <Modal
          title={modalContent.title}
          closeLabel={t.close}
          onClose={() => setModalContent(null)}
        >
          {'body' in modalContent && <p>{modalContent.body}</p>}
          {'list' in modalContent && (
            <ul className="tag-list">
              {modalContent.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {'skillGroups' in modalContent && (
            <div className="skill-groups">
              {modalContent.skillGroups.map((group) => (
                <section className="skill-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <p>{group.items.join(', ')}</p>
                </section>
              ))}
            </div>
          )}
          {'projects' in modalContent && (
            <div className="project-list">
              {modalContent.projects.map((project) => (
                <article className="project-card" key={project.title}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <p className="project-card__stack">{project.stack.join(' / ')}</p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {t.viewProject}
                  </a>
                </article>
              ))}
            </div>
          )}
        </Modal>
      )}
    </main>
  );
}
