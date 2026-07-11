export type Project = {
  title: string;
  description: string;
  stack: string[];
  link: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

const frenchContent = {
  parcours: `Étudiante en informatique, je me spécialise progressivement en data science et en intelligence artificielle.

Mon parcours m’a permis de travailler sur des projets variés : développement web, analyse de données, machine learning, visualisation, jeux vidéo et systèmes interactifs.

J’ai également réalisé un stage de L3 au LIRIS, orienté data et extraction d’informations, ce qui a confirmé mon intérêt pour les projets mêlant IA, données et applications concrètes.

Aujourd’hui, je cherche à continuer dans cette voie à travers des projets utiles, créatifs et bien construits.`,
  competences: [
    {
      title: 'Data & IA',
      items: ['Python', 'pandas', 'scikit-learn', 'machine learning', 'data visualisation', 'NLP', 'LLMs'],
    },
    {
      title: 'Développement web',
      items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Node.js'],
    },
    {
      title: 'Bases de données',
      items: ['SQL', 'PostgreSQL', 'modélisation de données'],
    },
    {
      title: 'Programmation',
      items: ['Java', 'C++', 'C', 'OCaml', 'Prolog'],
    },
    {
      title: 'Outils',
      items: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'Linux/macOS'],
    },
    {
      title: 'Créatif & projets',
      items: ['Pixel art', 'interfaces interactives', 'jeux 2D', 'portfolio web'],
    },
  ] satisfies SkillGroup[],
  projets: [
    {
      title: 'French Learning Knowledge Graph',
      description:
        'Graphe de connaissances pour modéliser les difficultés rencontrées par des apprenants russophones en français langue étrangère, avec analyse des erreurs, règles grammaticales et parcours d’apprentissage.',
      stack: ['Python', 'Neo4j', 'Cypher', 'Knowledge Graph'],
      link: 'https://github.com/merieme-laib/french-learning-knowledge-graph',
    },
    {
      title: 'E-Commerce Sales Analysis',
      description:
        'Analyse de données e-commerce basée sur plus de 500 000 transactions, avec nettoyage des données, exploration des ventes et segmentation client RFM.',
      stack: ['Python', 'pandas', 'Matplotlib', 'Jupyter Notebook'],
      link: 'https://github.com/merieme-laib/ecommerce-sales-analysis',
    },
    {
      title: 'Japan Tourism Analytics Dashboard',
      description:
        "Dashboard interactif analysant l’évolution du tourisme entrant au Japon, avec tendances, comparaison par pays, impact du COVID-19 et prévisions simples.",
      stack: ['Python', 'pandas', 'Streamlit', 'Plotly', 'statsmodels'],
      link: 'https://github.com/merieme-laib/japan-tourism-dashboard',
    },
  ] satisfies Project[],
  recherche:
    "Stage en data science / IA a partir de fevrier 2027, idealement a l'international.",
};

const englishContent = {
  parcours: `I am a computer science student gradually specializing in data science and artificial intelligence.

My studies have allowed me to work on a wide range of projects, including web development, data analysis, machine learning, visualization, video games and interactive systems.

I also completed a third-year internship at LIRIS focused on data and information extraction, which confirmed my interest in projects combining AI, data and real-world applications.

Today, I want to continue along this path through useful, creative and well-crafted projects.`,
  competences: [
    {
      title: 'Data & AI',
      items: ['Python', 'pandas', 'scikit-learn', 'machine learning', 'data visualization', 'NLP', 'LLMs'],
    },
    {
      title: 'Web development',
      items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Node.js'],
    },
    {
      title: 'Databases',
      items: ['SQL', 'PostgreSQL', 'data modeling'],
    },
    {
      title: 'Programming',
      items: ['Java', 'C++', 'C', 'OCaml', 'Prolog'],
    },
    {
      title: 'Tools',
      items: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'Linux/macOS'],
    },
    {
      title: 'Creative work & projects',
      items: ['Pixel art', 'interactive interfaces', '2D games', 'web portfolio'],
    },
  ] satisfies SkillGroup[],
  projets: [
    {
      title: 'French Learning Knowledge Graph',
      description:
        'A knowledge graph modeling the challenges faced by Russian-speaking learners of French as a foreign language, including error analysis, grammar rules and learning paths.',
      stack: ['Python', 'Neo4j', 'Cypher', 'Knowledge Graph'],
      link: 'https://github.com/merieme-laib/french-learning-knowledge-graph',
    },
    {
      title: 'E-Commerce Sales Analysis',
      description:
        'An e-commerce data analysis based on more than 500,000 transactions, including data cleaning, sales exploration and RFM customer segmentation.',
      stack: ['Python', 'pandas', 'Matplotlib', 'Jupyter Notebook'],
      link: 'https://github.com/merieme-laib/ecommerce-sales-analysis',
    },
    {
      title: 'Japan Tourism Analytics Dashboard',
      description:
        'An interactive dashboard analyzing inbound tourism trends in Japan, with country comparisons, the impact of COVID-19 and simple forecasts.',
      stack: ['Python', 'pandas', 'Streamlit', 'Plotly', 'statsmodels'],
      link: 'https://github.com/merieme-laib/japan-tourism-dashboard',
    },
  ] satisfies Project[],
  recherche:
    'A data science / AI internship starting in February 2027, ideally in an international environment.',
};

export const portfolioContent = {
  fr: frenchContent,
  en: englishContent,
};

export const aboutContent = frenchContent;

export const musicTracks = [
  {
    id: 'song1',
    title: { fr: 'Session lo-fi au bureau', en: 'Lo-fi desk session' },
    src: new URL('../assets/music/song1.mp3', import.meta.url).href,
  },
  {
    id: 'song2',
    title: { fr: 'Mélodie de code nocturne', en: 'Night code melody' },
    src: new URL('../assets/music/song2.mp3', import.meta.url).href,
  },
  {
    id: 'song3',
    title: { fr: 'Pixels tout doux', en: 'Soft pixels' },
    src: new URL('../assets/music/song3.mp3', import.meta.url).href,
  },
];
