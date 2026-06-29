# Portfolio de Merieme

Portfolio interactif en pixel art, pense comme une petite scene point-and-click. La chambre sert de scene principale: l'utilisateur clique sur des objets, le personnage se deplace, puis un menu retro apparait.

## Installation

```bash
npm install
npm run dev
```

Vite affichera une URL locale, generalement `http://localhost:5173`.

## Structure

```txt
src/
  assets/
    character.png
    room.png
    music/
      song1.mp3
      song2.mp3
      song3.mp3
  components/
    GameScene.tsx
    Character.tsx
    Hotspot.tsx
    InteractionMenu.tsx
    Modal.tsx
    MusicPlayer.tsx
  data/
    hotspots.ts
    links.ts
    navigation.ts
    portfolioContent.ts
  utils/
    pathfinding.ts
  styles/
    global.css
  App.tsx
  main.tsx
```

## Modifier les liens

Les liens externes sont dans `src/data/links.ts`.

```ts
export const externalLinks = {
  cv: '/cv.pdf',
  linkedin: 'https://www.linkedin.com/in/TON-LIEN',
  github: 'https://github.com/TON-LIEN',
  pinterest: 'https://www.pinterest.com/TON-LIEN',
};
```

Place le fichier PDF du CV dans `public/cv.pdf` pour que le lien `/cv.pdf` fonctionne en production.

## Modifier les zones cliquables

Les objets interactifs sont dans `src/data/hotspots.ts`. Les positions sont en pourcentage de l'image:

- `area`: rectangle cliquable transparent.
- `characterTarget`: position ou le personnage se deplace.
- `menuPosition`: position du menu.
- `interaction`: type de menu a ouvrir.

Active le mode `Debug` dans l'interface pour voir les rectangles des hotspots pendant les ajustements.

## Modifier la navigation

La navigation est geree par une grille invisible dans `src/data/navigation.ts` et par l'algorithme A* dans `src/utils/pathfinding.ts`.

- `GRID_COLS` et `GRID_ROWS`: precision de la grille.
- `blockedAreas`: rectangles ou le personnage ne peut pas marcher.
- `objectTargets`: positions ou le personnage se place pour interagir avec les objets.

Quand l'utilisateur clique sur le sol, le clic est converti en cellule de grille. Si la cellule est bloquee, le code cherche automatiquement la cellule marchable la plus proche, puis calcule un chemin autour des obstacles.

Pour afficher la grille de navigation en permanence, passe cette constante a `true` dans `src/data/navigation.ts`:

```ts
export const DEBUG_NAVIGATION = true;
```

Le bouton `Debug` de l'interface affiche aussi la grille et le chemin courant pendant les reglages.

## Modifier les textes

Le contenu de la bibliotheque et les projets sont dans `src/data/portfolioContent.ts`.

## Modifier le personnage

Le sprite du personnage est dans `src/assets/character.png`. Pour ajuster sa taille dans la scene, modifie la largeur de `.character` dans `src/styles/global.css`:

```css
.character {
  width: 17%;
}
```

Le point de navigation correspond aux pieds du personnage grace au `transform: translate(-50%, -95%)`.

## Ajouter une musique

Ajoute tes fichiers dans `src/assets/music/` avec ces noms:

- `song1.mp3`
- `song2.mp3`
- `song3.mp3`

Puis modifie les titres dans `src/data/portfolioContent.ts`. Si un fichier manque, le lecteur reste utilisable et affiche simplement un message.

## Deploiement

### Vercel

1. Pousse le projet sur GitHub.
2. Importe le repo dans Vercel.
3. Garde les reglages par defaut: build `npm run build`, dossier de sortie `dist`.

### GitHub Pages

1. Installe la dependance de deploiement si besoin: `npm install -D gh-pages`.
2. Ajoute dans `package.json`:

```json
{
  "homepage": "https://TON-USER.github.io/NOM-DU-REPO",
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Lance `npm run deploy`.
