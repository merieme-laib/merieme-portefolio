import type { ReactNode } from 'react';
import { externalLinks } from '../data/links';
import { aboutContent } from '../data/portfolioContent';
import type { Hotspot } from '../data/hotspots';

type ModalContent =
  | { title: string; body: string }
  | { title: string; list: string[] }
  | { title: string; skillGroups: typeof aboutContent.competences }
  | { title: string; projects: typeof aboutContent.projets };

type InteractionMenuProps = {
  hotspot: Hotspot;
  onClose: () => void;
  onSleep: () => void;
  onOpenModal: (content: ModalContent) => void;
  musicPlayer: ReactNode;
};

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="pixel-button" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function InteractionMenu({
  hotspot,
  onClose,
  onSleep,
  onOpenModal,
  musicPlayer,
}: InteractionMenuProps) {
  const style = {
    left: `${hotspot.menuPosition.x}%`,
    top: `${hotspot.menuPosition.y}%`,
  };

  return (
    <section
      className="pixel-panel interaction-menu"
      style={style}
      aria-label={hotspot.label}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="panel-header">
        <h2>{hotspot.label}</h2>
        <button className="icon-button" type="button" onClick={onClose} aria-label="Fermer">
          x
        </button>
      </div>

      {hotspot.interaction === 'computer' && (
        <div className="menu-actions">
          <ExternalLink href={externalLinks.cv}>Consulter le CV</ExternalLink>
          <ExternalLink href={externalLinks.linkedin}>Consulter LinkedIn</ExternalLink>
          <ExternalLink href={externalLinks.github}>Consulter GitHub</ExternalLink>
          <ExternalLink href={externalLinks.pinterest}>Consulter Pinterest</ExternalLink>
        </div>
      )}

      {hotspot.interaction === 'bed' && (
        <div className="menu-actions">
          <p className="menu-copy">Un peu de repos avant de repartir explorer.</p>
          <button className="pixel-button" type="button" onClick={onSleep}>
            Dormir
          </button>
        </div>
      )}

      {hotspot.interaction === 'music' && musicPlayer}

      {hotspot.interaction === 'library' && (
        <div className="menu-actions">
          <button
            className="pixel-button"
            type="button"
            onClick={() => onOpenModal({ title: 'Mon parcours', body: aboutContent.parcours })}
          >
            Mon parcours
          </button>
          <button
            className="pixel-button"
            type="button"
            onClick={() =>
              onOpenModal({ title: 'Mes competences', skillGroups: aboutContent.competences })
            }
          >
            Mes competences
          </button>
          <button
            className="pixel-button"
            type="button"
            onClick={() => onOpenModal({ title: 'Mes projets', projects: aboutContent.projets })}
          >
            Mes projets
          </button>
          <button
            className="pixel-button"
            type="button"
            onClick={() =>
              onOpenModal({ title: 'Ce que je recherche', body: aboutContent.recherche })
            }
          >
            Ce que je recherche
          </button>
        </div>
      )}
    </section>
  );
}

export type { ModalContent };
