import { objectTargets } from './navigation';

export type InteractionType = 'computer' | 'bed' | 'music' | 'library';

export type Point = {
  x: number;
  y: number;
};

export type Hotspot = {
  id: string;
  label: string;
  area: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  characterTarget: Point;
  menuPosition: Point;
  interaction: InteractionType;
};

export const initialCharacterPosition: Point = { x: 39, y: 64 };

export const hotspots: Hotspot[] = [
  {
    id: 'computer',
    label: 'Ordinateur',
    area: { x: 36, y: 31, width: 13, height: 13 },
    characterTarget: objectTargets.computer,
    menuPosition: { x: 48, y: 40 },
    interaction: 'computer',
  },
  {
    id: 'bed',
    label: 'Lit',
    area: { x: 64, y: 35, width: 28, height: 39 },
    characterTarget: objectTargets.bed,
    menuPosition: { x: 67, y: 48 },
    interaction: 'bed',
  },
  {
    id: 'record-player',
    label: 'Tourne-disque',
    area: { x: 5, y: 64, width: 18, height: 13 },
    characterTarget: objectTargets['record-player'],
    menuPosition: { x: 28, y: 67 },
    interaction: 'music',
  },
  {
    id: 'library',
    label: 'Bibliotheque',
    area: { x: 9, y: 10, width: 23, height: 34 },
    characterTarget: objectTargets.library,
    menuPosition: { x: 33, y: 24 },
    interaction: 'library',
  },
];
