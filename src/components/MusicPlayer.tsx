import { musicTracks } from '../data/portfolioContent';

type MusicPlayerProps = {
  trackIndex: number;
  isPlaying: boolean;
  volume: number;
  message: string;
  onSelectTrack: (index: number) => void;
  onTogglePlayback: () => void;
  onVolumeChange: (volume: number) => void;
};

export function MusicPlayer({
  trackIndex,
  isPlaying,
  volume,
  message,
  onSelectTrack,
  onTogglePlayback,
  onVolumeChange,
}: MusicPlayerProps) {
  return (
    <div className="music-player">
      <div className="track-list" role="list" aria-label="Chansons">
        {musicTracks.map((track, index) => (
          <button
            className={index === trackIndex ? 'track-button track-button--active' : 'track-button'}
            type="button"
            key={track.id}
            onClick={() => onSelectTrack(index)}
          >
            {track.title}
          </button>
        ))}
      </div>

      <div className="music-controls">
        <button className="playback-button" type="button" onClick={onTogglePlayback}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <label className="volume-control">
          Volume
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
