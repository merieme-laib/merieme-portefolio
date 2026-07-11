import { musicTracks } from '../data/portfolioContent';
import type { Language, Translation } from '../data/translations';

type MusicPlayerProps = {
  trackIndex: number;
  isPlaying: boolean;
  volume: number;
  message: string;
  onSelectTrack: (index: number) => void;
  onTogglePlayback: () => void;
  onVolumeChange: (volume: number) => void;
  translations: Translation;
  language: Language;
};

export function MusicPlayer({
  trackIndex,
  isPlaying,
  volume,
  message,
  onSelectTrack,
  onTogglePlayback,
  onVolumeChange,
  translations,
  language,
}: MusicPlayerProps) {
  return (
    <div className="music-player">
      <div className="track-list" role="list" aria-label={translations.songs}>
        {musicTracks.map((track, index) => (
          <button
            className={index === trackIndex ? 'track-button track-button--active' : 'track-button'}
            type="button"
            key={track.id}
            onClick={() => onSelectTrack(index)}
          >
            {track.title[language]}
          </button>
        ))}
      </div>

      <div className="music-controls">
        <button className="playback-button" type="button" onClick={onTogglePlayback}>
          {isPlaying ? translations.pause : translations.play}
        </button>
        <label className="volume-control">
          {translations.volume}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(event) => onVolumeChange(Number(event.target.value))}
          />
        </label>
      </div>

      <p className="status-text">{message}</p>
    </div>
  );
}
