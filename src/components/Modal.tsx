import { useEffect } from 'react';
import type { ReactNode } from 'react';

type ModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
  closeLabel: string;
};

export function Modal({ title, children, onClose, closeLabel }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="pixel-panel modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="panel-header">
          <h2 id="modal-title">{title}</h2>
          <button className="icon-button" type="button" onClick={onClose} aria-label={closeLabel}>
            x
          </button>
        </div>
        <div className="modal__content">{children}</div>
      </section>
    </div>
  );
}
