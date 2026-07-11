import type { Hotspot as HotspotType } from '../data/hotspots';

type HotspotProps = {
  hotspot: HotspotType;
  label: string;
  interactWithLabel: string;
  debug: boolean;
  onSelect: (hotspot: HotspotType) => void;
};

export function Hotspot({ hotspot, label, interactWithLabel, debug, onSelect }: HotspotProps) {
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
      aria-label={`${interactWithLabel} ${label}`}
    >
      <span className="hotspot__tooltip">{label}</span>
    </button>
  );
}
