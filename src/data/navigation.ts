import type { Point } from './hotspots';

export const DEBUG_NAVIGATION = false;

export const GRID_COLS = 40;
export const GRID_ROWS = 30;

export type NavigationRect = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export const blockedAreas: NavigationRect[] = [
  { id: 'wall-top', x: 0, y: 0, width: 100, height: 31 },
  { id: 'left-frame', x: 0, y: 0, width: 4, height: 100 },
  { id: 'right-frame', x: 96, y: 0, width: 4, height: 100 },
  { id: 'bottom-frame-left', x: 0, y: 91, width: 24, height: 9 },
  { id: 'bottom-frame-right', x: 41, y: 91, width: 59, height: 9 },
  { id: 'bookshelf', x: 8, y: 9, width: 24, height: 38 },
  { id: 'left-plant', x: 4, y: 36, width: 11, height: 22 },
  { id: 'desk', x: 31, y: 33, width: 29, height: 18 },
  { id: 'desk-drawers', x: 47, y: 47, width: 13, height: 9 },
  { id: 'chair', x: 37, y: 48, width: 10, height: 12 },
  { id: 'nightstand', x: 56, y: 40, width: 10, height: 14 },
  { id: 'bed', x: 65, y: 34, width: 29, height: 43 },
  { id: 'record-table', x: 3, y: 66, width: 25, height: 22 },
  { id: 'floor-lamp', x: 86, y: 68, width: 8, height: 24 },
];

export const objectTargets: Record<string, Point> = {
  computer: { x: 42, y: 60 },
  bed: { x: 61, y: 61 },
  'record-player': { x: 21, y: 64 },
  library: { x: 29, y: 48 },
};
