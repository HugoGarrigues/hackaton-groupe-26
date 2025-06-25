import { Scenario } from '../types/game';

export const scenarios: Scenario[] = [
  {
    id: 'energy-policy',
    title: 'Politique Énergétique',
    description: 'Votre région doit répondre à une demande croissante en énergie. Quelle stratégie adoptez-vous ?',
    choices: [
      {
        id: 'fossil',
        text: 'Investir dans les énergies fossiles',
        description: 'Construction rapide de centrales au charbon',
        consequences: { pollution: +25, economy: +15, popularity: +5 },
        feedback: 'Décision rapide et efficace économiquement, mais l\'impact environnemental sera lourd à long terme.'
      },
      {
        id: 'renewable',
        text: 'Subventionner les énergies renouvelables',
        description: 'Investissement dans le solaire et l\'éolien',
        consequences: { pollution: -15, economy: -5, popularity: +20 },
        feedback: 'Investissement d\'avenir qui plaît au public, malgré des coûts initiaux élevés.'
      },
      {
        id: 'mixed',
        text: 'Stratégie mixte équilibrée',
        description: 'Combinaison énergies fossiles et renouvelables',
        consequences: { pollution: +5, economy: +5, popularity: +10 },
        feedback: 'Approche pragmatique qui satisfait différents intérêts sans choix radical.'
      }
    ]
  },
  {
    id: 'transport',
    title: 'Mobilité Urbaine',
    description: 'Les embouteillages paralysent votre ville. Comment résoudre ce problème de transport ?',
    choices: [
      {
        id: 'highways',
        text: 'Construire plus d\'autoroutes',
        description: 'Extension du réseau routier existant',
        consequences: { pollution: +20, economy: +10, popularity: +5 },
        feedback: 'Solution rapide qui aggrave la pollution mais stimule l\'économie locale.'
      },
      {
        id: 'public-transport',
        text: 'Développer les transports publics',
        description: 'Investissement dans métro, bus électriques et tramways',
        consequences: { pollution: -20, economy: -10, popularity: +15 },
        feedback: 'Vision à long terme qui réduit drastiquement les émissions et améliore la qualité de vie.'
      },
      {
        id: 'bike-lanes',
        text: 'Créer des pistes cyclables',
        description: 'Aménagement urbain pour vélos et piétons',
        consequences: { pollution: -10, economy: -5, popularity: +10 },
        feedback: 'Solution écologique et économique qui encourage un mode de vie plus sain.'
      }
    ]
  },
  {
    id: 'waste-management',
    title: 'Gestion des Déchets',
    description: 'Votre territoire fait face à une crise des déchets. Quelle approche privilégiez-vous ?',
    choices: [
      {
        id: 'landfill',
        text: 'Agrandir les décharges',
        description: 'Solution rapide et peu coûteuse',
        consequences: { pollution: +30, economy: +5, popularity: -10 },
        feedback: 'Choix économique à court terme mais catastrophique pour l\'environnement.'
      },
      {
        id: 'recycling',
        text: 'Investir dans le recyclage',
        description: 'Centres de tri et économie circulaire',
        consequences: { pollution: -25, economy: +5, popularity: +20 },
        feedback: 'Innovation qui crée des emplois verts et réduit significativement l\'impact environnemental.'
      },
      {
        id: 'reduction',
        text: 'Campagne de réduction des déchets',
        description: 'Sensibilisation et réglementation',
        consequences: { pollution: -15, economy: -5, popularity: +5 },
        feedback: 'Approche préventive qui nécessite un changement de mentalité mais très efficace.'
      }
    ]
  },
  {
    id: 'industry',
    title: 'Développement Industriel',
    description: 'Une grande entreprise souhaite s\'implanter dans votre région. Quelle est votre position ?',
    choices: [
      {
        id: 'heavy-industry',
        text: 'Accepter l\'industrie lourde',
        description: 'Usine chimique créant 2000 emplois',
        consequences: { pollution: +35, economy: +25, popularity: +15 },
        feedback: 'Boom économique immédiat mais pollution majeure et risques sanitaires.'
      },
      {
        id: 'green-tech',
        text: 'Privilégier les technologies vertes',
        description: 'Entreprise de panneaux solaires',
        consequences: { pollution: -10, economy: +15, popularity: +25 },
        feedback: 'Secteur d\'avenir qui attire les talents et positionne la région comme leader écologique.'
      },
      {
        id: 'reject',
        text: 'Refuser l\'implantation',
        description: 'Préserver l\'environnement local',
        consequences: { pollution: -5, economy: -15, popularity: -5 },
        feedback: 'Choix environnemental radical qui protège le territoire mais limite les opportunités économiques.'
      }
    ]
  },
  {
    id: 'agriculture',
    title: 'Politique Agricole',
    description: 'L\'agriculture locale traverse une crise. Comment soutenez-vous le secteur ?',
    choices: [
      {
        id: 'intensive',
        text: 'Intensifier l\'agriculture',
        description: 'Pesticides et engrais chimiques',
        consequences: { pollution: +25, economy: +20, popularity: +10 },
        feedback: 'Rendements élevés à court terme mais dégradation des sols et de la biodiversité.'
      },
      {
        id: 'organic',
        text: 'Transition vers le bio',
        description: 'Subventions pour l\'agriculture biologique',
        consequences: { pollution: -20, economy: +5, popularity: +20 },
        feedback: 'Transformation positive qui préserve les écosystèmes et améliore la qualité alimentaire.'
      },
      {
        id: 'permaculture',
        text: 'Promouvoir la permaculture',
        description: 'Formation et recherche en agriculture durable',
        consequences: { pollution: -15, economy: -5, popularity: +15 },
        feedback: 'Innovation agricole respectueuse qui inspire d\'autres régions malgré des revenus plus modestes.'
      }
    ]
  }
];