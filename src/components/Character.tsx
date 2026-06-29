import type { Point } from '../data/hotspots';
import characterImage from '../assets/character.png';

type CharacterProps = {
  position: Point;
  isWalking: boolean;
};

export function Character({ position, isWalking }: CharacterProps) {
  return (
    <div
      className={`character${isWalking ? ' character--walking' : ''}`}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      aria-label="Personnage de Merieme"
    >
      <img className="character__sprite" src={characterImage} alt="" draggable="false" />
    </div>
  );
}
