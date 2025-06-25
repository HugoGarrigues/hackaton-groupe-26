import { PlayerProfile } from '../types/game';

const STORAGE_KEY = 'planete-ou-profit-game';

export const saveGameData = (player: PlayerProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
  }
};

export const loadGameData = (): PlayerProfile | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erreur lors du chargement:', error);
    return null;
  }
};

export const clearGameData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
  }
};