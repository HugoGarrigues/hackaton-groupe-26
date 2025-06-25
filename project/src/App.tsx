import React, { useState, useEffect } from 'react';
import { GameState, PlayerProfile, Choice } from './types/game';
import { scenarios } from './data/scenarios';
import { saveGameData, loadGameData, clearGameData } from './utils/storage';
import { GameHeader } from './components/GameHeader';
import { ScenarioCard } from './components/ScenarioCard';
import { ResultsPage } from './components/ResultsPage';
import { 
  Building, 
  Users, 
  Award,
  Globe,
  TrendingUp,
  Info
} from 'lucide-react';

function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [player, setPlayer] = useState<PlayerProfile | null>(null);

  useEffect(() => {
    const savedGame = loadGameData();
    if (savedGame && !savedGame.gameCompleted) {
      setPlayer(savedGame);
      setGameState('playing');
    }
  }, []);

  const startNewGame = (role: 'mayor' | 'entrepreneur' | 'minister') => {
    const newPlayer: PlayerProfile = {
      role,
      name: getRoleName(role),
      currentScenario: 0,
      scores: { pollution: 0, economy: 0, popularity: 0 },
      decisions: [],
      gameCompleted: false
    };
    
    setPlayer(newPlayer);
    saveGameData(newPlayer);
    setGameState('playing');
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'mayor': return 'Marie Dubois';
      case 'entrepreneur': return 'Thomas Martin';
      case 'minister': return 'Sophie Laurent';
      default: return 'Joueur';
    }
  };

  const handleChoice = (choice: Choice) => {
    if (!player) return;

    const updatedPlayer: PlayerProfile = {
      ...player,
      scores: {
        pollution: player.scores.pollution + choice.consequences.pollution,
        economy: player.scores.economy + choice.consequences.economy,
        popularity: player.scores.popularity + choice.consequences.popularity
      },
      decisions: [...player.decisions, choice.text],
      currentScenario: player.currentScenario + 1
    };

    if (updatedPlayer.currentScenario >= scenarios.length) {
      updatedPlayer.gameCompleted = true;
      setGameState('results');
    }

    setPlayer(updatedPlayer);
    saveGameData(updatedPlayer);
  };

  const restartGame = () => {
    clearGameData();
    setPlayer(null);
    setGameState('menu');
  };

  const goToMenu = () => {
    setGameState('menu');
  };

  // Menu principal
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <Globe className="w-16 h-16 text-emerald-600 mr-4" />
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                    Planète ou Profit ?
                  </h1>
                  <p className="text-lg text-gray-600">
                    Le jeu qui révèle vos priorités de décideur
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <Building className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Incarnez un décideur</h3>
                  <p className="text-gray-600 text-sm">
                    Maire, entrepreneur ou ministre : choisissez votre rôle et ses responsabilités
                  </p>
                </div>
                <div className="p-4">
                  <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Prenez des décisions</h3>
                  <p className="text-gray-600 text-sm">
                    5 scénarios réalistes pour équilibrer économie, écologie et popularité
                  </p>
                </div>
                <div className="p-4">
                  <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Découvrez vos résultats</h3>
                  <p className="text-gray-600 text-sm">
                    Analyse surprise de vos choix avec image personnalisée
                  </p>
                </div>
              </div>
            </div>

            {/* Sélection de rôle */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Choisissez votre rôle
              </h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={() => startNewGame('mayor')}
                  className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                >
                  <Building className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">Maire</h3>
                  <p className="text-sm opacity-90">
                    Gérez votre ville entre développement et environnement
                  </p>
                </button>

                <button
                  onClick={() => startNewGame('entrepreneur')}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                >
                  <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">Entrepreneur</h3>
                  <p className="text-sm opacity-90">
                    Développez votre entreprise de manière responsable
                  </p>
                </button>

                <button
                  onClick={() => startNewGame('minister')}
                  className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                >
                  <Users className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">Ministre</h3>
                  <p className="text-sm opacity-90">
                    Définissez les politiques nationales d'avenir
                  </p>
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="flex justify-center">
              <div className="flex items-center text-gray-600">
                <Info className="w-5 h-5 mr-2" />
                <span className="text-sm">Aucune donnée collectée • Jeu 100% local</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Page de jeu
  if (gameState === 'playing' && player) {
    const currentScenario = scenarios[player.currentScenario];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <GameHeader player={player} onBack={goToMenu} />
            
            {currentScenario && (
              <ScenarioCard
                scenario={currentScenario}
                onChoice={handleChoice}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Page de résultats
  if (gameState === 'results' && player) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="container mx-auto px-4 py-8">
          <ResultsPage
            player={player}
            onRestart={restartGame}
            onHome={goToMenu}
          />
        </div>
      </div>
    );
  }

  return null;
}

export default App;