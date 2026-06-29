import { blockedAreas, GRID_COLS, GRID_ROWS } from '../data/navigation';
import type { Point } from '../data/hotspots';

export type GridCell = {
  col: number;
  row: number;
};

type PathNode = GridCell & {
  g: number;
  h: number;
  f: number;
  parent: string | null;
};

const directions: GridCell[] = [
  { col: 0, row: -1 },
  { col: 1, row: 0 },
  { col: 0, row: 1 },
  { col: -1, row: 0 },
];

export function percentToCell(point: Point): GridCell {
  return {
    col: clamp(Math.floor((point.x / 100) * GRID_COLS), 0, GRID_COLS - 1),
    row: clamp(Math.floor((point.y / 100) * GRID_ROWS), 0, GRID_ROWS - 1),
  };
}

export function cellToPercent(cell: GridCell): Point {
  return {
    x: ((cell.col + 0.5) / GRID_COLS) * 100,
    y: ((cell.row + 0.5) / GRID_ROWS) * 100,
  };
}

export function isWalkableCell(cell: GridCell): boolean {
  if (!isInsideGrid(cell)) {
    return false;
  }

  const center = cellToPercent(cell);
  return !blockedAreas.some((area) =>
    pointIsInsideRect(center, {
      x: area.x,
      y: area.y,
      width: area.width,
      height: area.height,
    }),
  );
}

export function findNearestWalkableCell(cell: GridCell): GridCell | null {
  if (isWalkableCell(cell)) {
    return cell;
  }

  const queue: GridCell[] = [cell];
  const visited = new Set([cellKey(cell)]);

  while (queue.length > 0) {
    const current = queue.shift()!;

    for (const direction of directions) {
      const next = {
        col: current.col + direction.col,
        row: current.row + direction.row,
      };
      const key = cellKey(next);

      if (!isInsideGrid(next) || visited.has(key)) {
        continue;
      }

      if (isWalkableCell(next)) {
        return next;
      }

      visited.add(key);
      queue.push(next);
    }
  }

  return null;
}

export function findPath(start: GridCell, end: GridCell): GridCell[] {
  const walkableStart = findNearestWalkableCell(start);
  const walkableEnd = findNearestWalkableCell(end);

  if (!walkableStart || !walkableEnd) {
    return [];
  }

  const open = new Map<string, PathNode>();
  const allNodes = new Map<string, PathNode>();
  const closed = new Set<string>();
  const startNode = createNode(walkableStart, 0, heuristic(walkableStart, walkableEnd), null);

  open.set(cellKey(walkableStart), startNode);
  allNodes.set(cellKey(walkableStart), startNode);

  while (open.size > 0) {
    const current = getLowestCostNode(open);
    const currentKey = cellKey(current);

    if (current.col === walkableEnd.col && current.row === walkableEnd.row) {
      return reconstructPath(current, allNodes);
    }

    open.delete(currentKey);
    closed.add(currentKey);

    for (const direction of directions) {
      const neighbor = {
        col: current.col + direction.col,
        row: current.row + direction.row,
      };
      const neighborKey = cellKey(neighbor);

      if (!isWalkableCell(neighbor) || closed.has(neighborKey)) {
        continue;
      }

      const g = current.g + 1;
      const existing = open.get(neighborKey);

      if (!existing || g < existing.g) {
        const node = createNode(neighbor, g, heuristic(neighbor, walkableEnd), currentKey);
        open.set(neighborKey, node);
        allNodes.set(neighborKey, node);
      }
    }
  }

  return [];
}

export function buildNavigationGrid(): { cell: GridCell; isWalkable: boolean }[] {
  const cells: { cell: GridCell; isWalkable: boolean }[] = [];

  for (let row = 0; row < GRID_ROWS; row += 1) {
    for (let col = 0; col < GRID_COLS; col += 1) {
      const cell = { col, row };
      cells.push({ cell, isWalkable: isWalkableCell(cell) });
    }
  }

  return cells;
}

function createNode(cell: GridCell, g: number, h: number, parent: string | null): PathNode {
  return {
    ...cell,
    g,
    h,
    f: g + h,
    parent,
  };
}

function getLowestCostNode(open: Map<string, PathNode>): PathNode {
  return [...open.values()].reduce((best, node) => {
    if (node.f < best.f || (node.f === best.f && node.h < best.h)) {
      return node;
    }

    return best;
  });
}

function reconstructPath(endNode: PathNode, nodes: Map<string, PathNode>): GridCell[] {
  const path: GridCell[] = [endNode];
  let parentKey = endNode.parent;

  while (parentKey) {
    const parent = nodes.get(parentKey);

    if (!parent) {
      break;
    }

    path.unshift(parent);
    parentKey = parent.parent;
  }

  return path;
}

function heuristic(a: GridCell, b: GridCell): number {
  return Math.abs(a.col - b.col) + Math.abs(a.row - b.row);
}

function isInsideGrid(cell: GridCell): boolean {
  return cell.col >= 0 && cell.col < GRID_COLS && cell.row >= 0 && cell.row < GRID_ROWS;
}

function pointIsInsideRect(point: Point, rect: Omit<(typeof blockedAreas)[number], 'id'>): boolean {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  );
}

function cellKey(cell: GridCell): string {
  return `${cell.col}:${cell.row}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
