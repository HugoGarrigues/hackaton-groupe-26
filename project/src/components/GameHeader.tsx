import React from 'react';
import { ArrowLeft, Building, TrendingUp, Users } from 'lucide-react';
import { PlayerProfile } from '../types/game';

interface GameHeaderProps {
  player: PlayerProfile;
  onBack: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ player, onBack }) => {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'mayor': return 'Maire';
      case 'entrepreneur': return 'Entrepreneur';
      case 'minister': return 'Ministre';
      default: return role;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'mayor': return <Building className="w-6 h-6 text-emerald-600" />;
      case 'entrepreneur': return <TrendingUp className="w-6 h-6 text-blue-600" />;
      case 'minister': return <Users className="w-6 h-6 text-purple-600" />;
      default: return <Building className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour
        </button>
        
        <div className="flex items-center">
          {getRoleIcon(player.role)}
          <div className="ml-3 text-center">
            <h2 className="text-lg font-semibold text-gray-800">{getRoleLabel(player.role)}</h2>
            <p className="text-sm text-gray-600">{player.name}</p>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          {player.currentScenario + 1}/5
        </div>
      </div>
    </div>
  );
};