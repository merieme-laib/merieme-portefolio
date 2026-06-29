import { GRID_COLS, GRID_ROWS } from '../data/navigation';
import { buildNavigationGrid, type GridCell } from '../utils/pathfinding';

type NavigationDebugOverlayProps = {
  path: GridCell[];
};

const navigationGrid = buildNavigationGrid();

export function NavigationDebugOverlay({ path }: NavigationDebugOverlayProps) {
  const pathKeys = new Set(path.map((cell) => `${cell.col}:${cell.row}`));

  return (
    <div
      className="navigation-debug"
      style={{
        gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
      }}
      aria-hidden="true"
    >
      {navigationGrid.map(({ cell, isWalkable }) => {
        const key = `${cell.col}:${cell.row}`;

        return (
          <span
            className={[
              'navigation-debug__cell',
              isWalkable ? 'navigation-debug__cell--walkable' : 'navigation-debug__cell--blocked',
              pathKeys.has(key) ? 'navigation-debug__cell--path' : '',
            ].join(' ')}
            key={key}
          />
        );
      })}
    </div>
  );
}
