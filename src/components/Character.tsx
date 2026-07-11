import type { Point } from '../data/hotspots';
import characterImage from '../assets/character.png';
import characterNightImage from '../assets/character-night.png';

type CharacterProps = {
  position: Point;
  isWalking: boolean;
  isNightMode: boolean;
  ariaLabel: string;
};

export function Character({ position, isWalking, isNightMode, ariaLabel }: CharacterProps) {
  return (
    <div
      className={`character${isWalking ? ' character--walking' : ''}${isNightMode ? ' character--night' : ''}`}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      aria-label={ariaLabel}
    >
      <img
        className="character__sprite"
        src={isNightMode ? characterNightImage : characterImage}
        alt=""
        draggable="false"
      />
    </div>
  );
}
