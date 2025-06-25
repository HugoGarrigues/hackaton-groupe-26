export interface GameScore {
  pollution: number;
  economy: number;
  popularity: number;
}

export interface Choice {
  id: string;
  text: string;
  description: string;
  consequences: {
    pollution: number;
    economy: number;
    popularity: number;
  };
  feedback: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  choices: Choice[];
}

export interface PlayerProfile {
  role: 'mayor' | 'entrepreneur' | 'minister';
  name: string;
  currentScenario: number;
  scores: GameScore;
  decisions: string[];
  gameCompleted: boolean;
}

export type GameState = 'menu' | 'roleSelection' | 'playing' | 'results';