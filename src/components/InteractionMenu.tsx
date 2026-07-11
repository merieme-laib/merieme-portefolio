import type { ReactNode } from 'react';
import { externalLinks } from '../data/links';
import { portfolioContent, type Project, type SkillGroup } from '../data/portfolioContent';
import type { Hotspot } from '../data/hotspots';
import type { Language, Translation } from '../data/translations';

type ModalContent =
  | { title: string; body: string }
  | { title: string; list: string[] }
  | { title: string; skillGroups: SkillGroup[] }
  | { title: string; projects: Project[] };

type InteractionMenuProps = {
  hotspot: Hotspot;
  onClose: () => void;
  onSleep: () => void;
  onOpenModal: (content: ModalContent) => void;
  musicPlayer: ReactNode;
  language: Language;
  translations: Translation;
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
  language,
  translations,
}: InteractionMenuProps) {
  const content = portfolioContent[language];
  const hotspotLabel = translations.hotspots[hotspot.id as keyof Translation['hotspots']];
  const style = {
    left: `${hotspot.menuPosition.x}%`,
    top: `${hotspot.menuPosition.y}%`,
  };

  return (
    <section
      className="pixel-panel interaction-menu"
      style={style}
      aria-label={hotspotLabel}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="panel-header">
        <h2>{hotspotLabel}</h2>
        <button className="icon-button" type="button" onClick={onClose} aria-label={translations.close}>
          x
        </button>
      </div>

      {hotspot.interaction === 'computer' && (
        <div className="menu-actions">
          <ExternalLink href={externalLinks.cv}>{translations.viewCv}</ExternalLink>
          <ExternalLink href={externalLinks.linkedin}>{translations.viewLinkedIn}</ExternalLink>
          <ExternalLink href={externalLinks.github}>{translations.viewGitHub}</ExternalLink>
          <ExternalLink href={externalLinks.pinterest}>{translations.viewPinterest}</ExternalLink>
        </div>
      )}

      {hotspot.interaction === 'bed' && (
        <div className="menu-actions">
          <p className="menu-copy">{translations.restCopy}</p>
          <button className="pixel-button" type="button" onClick={onSleep}>
            {translations.sleep}
          </button>
        </div>
      )}

      {hotspot.interaction === 'music' && musicPlayer}

      {hotspot.interaction === 'library' && (
        <div className="menu-actions">
          <button
            className="pixel-button"
            type="button"
            onClick={() => onOpenModal({ title: translations.journey, body: content.parcours })}
          >
            {translations.journey}
          </button>
          <button
            className="pixel-button"
            type="button"
            onClick={() =>
              onOpenModal({ title: translations.skills, skillGroups: content.competences })
            }
          >
            {translations.skills}
          </button>
          <button
            className="pixel-button"
            type="button"
            onClick={() => onOpenModal({ title: translations.projects, projects: content.projets })}
          >
            {translations.projects}
          </button>
          <button
            className="pixel-button"
            type="button"
            onClick={() =>
              onOpenModal({ title: translations.lookingFor, body: content.recherche })
            }
          >
            {translations.lookingFor}
          </button>
        </div>
      )}
    </section>
  );
}

export type { ModalContent };
