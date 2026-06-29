import type { Hotspot as HotspotType } from '../data/hotspots';

type HotspotProps = {
  hotspot: HotspotType;
  debug: boolean;
  onSelect: (hotspot: HotspotType) => void;
};

export function Hotspot({ hotspot, debug, onSelect }: HotspotProps) {
  const { area } = hotspot;

  return (
    <button
      className={`hotspot${debug ? ' hotspot--debug' : ''}`}
      style={{
        left: `${area.x}%`,
        top: `${area.y}%`,
        width: `${area.width}%`,
        height: `${area.height}%`,
      }}
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onSelect(hotspot);
      }}
      aria-label={`Interagir avec ${hotspot.label}`}
    >
      <span className="hotspot__tooltip">{hotspot.label}</span>
    </button>
  );
}
