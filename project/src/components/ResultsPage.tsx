import React, { useState, useEffect, useRef } from 'react';
import { PlayerProfile } from '../types/game';
import { Trophy, Download, Share2, Home, RefreshCw, Leaf, TrendingUp, Users, Award, Target } from 'lucide-react';

interface ResultsPageProps {
  player: PlayerProfile;
  onRestart: () => void;
  onHome: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ player, onRestart, onHome }) => {
  const [imageGenerated, setImageGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getOverallRating = () => {
    const { pollution, economy, popularity } = player.scores;
    const envScore = Math.max(0, 100 - Math.abs(pollution));
    const ecoScore = Math.max(0, 100 + economy);
    const popScore = Math.max(0, 100 + popularity);
    
    const average = (envScore + ecoScore + popScore) / 3;
    
    if (average >= 80) return { 
      rating: 'Visionnaire Écologique', 
      color: 'text-emerald-600', 
      desc: 'Vous avez su allier développement durable et prospérité ! Vos décisions montrent une vision à long terme remarquable.',
      bgColor: '#10B981',
      gradient: 'from-emerald-500 to-green-600',
      icon: <Leaf className="w-8 h-8" />
    };
    if (average >= 60) return { 
      rating: 'Gestionnaire Équilibré', 
      color: 'text-blue-600', 
      desc: 'Un excellent compromis entre tous les enjeux. Vous savez naviguer entre les différentes priorités.',
      bgColor: '#3B82F6',
      gradient: 'from-blue-500 to-indigo-600',
      icon: <Target className="w-8 h-8" />
    };
    if (average >= 40) return { 
      rating: 'Décideur Pragmatique', 
      color: 'text-amber-600', 
      desc: 'Des choix pratiques et réalistes. Il y a encore du potentiel pour optimiser vos décisions.',
      bgColor: '#F59E0B',
      gradient: 'from-amber-500 to-orange-600',
      icon: <TrendingUp className="w-8 h-8" />
    };
    return { 
      rating: 'Apprenti Politique', 
      color: 'text-red-600', 
      desc: 'Un début prometteur ! Avec plus d\'expérience, vous trouverez le bon équilibre entre tous les enjeux.',
      bgColor: '#EF4444',
      gradient: 'from-red-500 to-pink-600',
      icon: <Award className="w-8 h-8" />
    };
  };

  const getScoreAnalysis = (score: number, type: 'pollution' | 'economy' | 'popularity') => {
    if (type === 'pollution') {
      if (score <= -20) return { level: 'Excellent', color: 'text-emerald-600', bg: 'bg-emerald-100', desc: 'Impact très positif sur l\'environnement' };
      if (score <= 0) return { level: 'Bon', color: 'text-green-600', bg: 'bg-green-100', desc: 'Impact environnemental maîtrisé' };
      if (score <= 20) return { level: 'Moyen', color: 'text-amber-600', bg: 'bg-amber-100', desc: 'Impact environnemental modéré' };
      return { level: 'À améliorer', color: 'text-red-600', bg: 'bg-red-100', desc: 'Impact environnemental important' };
    } else {
      if (score >= 20) return { level: 'Excellent', color: 'text-emerald-600', bg: 'bg-emerald-100', desc: 'Performance remarquable' };
      if (score >= 0) return { level: 'Bon', color: 'text-green-600', bg: 'bg-green-100', desc: 'Résultats positifs' };
      if (score >= -20) return { level: 'Moyen', color: 'text-amber-600', bg: 'bg-amber-100', desc: 'Résultats mitigés' };
      return { level: 'À améliorer', color: 'text-red-600', bg: 'bg-red-100', desc: 'Résultats décevants' };
    }
  };

  const generateEnhancedImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 500;
    canvas.height = 400;

    const overall = getOverallRating();
    const { pollution, economy, popularity } = player.scores;

    // Fond dégradé sophistiqué
    const gradient = ctx.createLinearGradient(0, 0, 500, 400);
    gradient.addColorStop(0, overall.bgColor + '15');
    gradient.addColorStop(0.5, overall.bgColor + '08');
    gradient.addColorStop(1, '#ffffff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 500, 400);

    // Bordure décorative
    ctx.strokeStyle = overall.bgColor + '40';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, 480, 380);

    // Titre principal
    ctx.fillStyle = overall.bgColor;
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🌍 Planète ou Profit ? 💼', 250, 50);

    // Résultat principal avec fond
    ctx.fillStyle = overall.bgColor + '20';
    ctx.fillRect(50, 70, 400, 60);
    ctx.fillStyle = overall.bgColor;
    ctx.font = 'bold 24px Arial';
    ctx.fillText(overall.rating, 250, 100);
    
    ctx.fillStyle = '#374151';
    ctx.font = '16px Arial';
    ctx.fillText(`Rôle: ${player.role === 'mayor' ? '🏛️ Maire' : player.role === 'entrepreneur' ? '💼 Entrepreneur' : '🏛️ Ministre'}`, 250, 120);

    // Graphiques en barres améliorés
    const barWidth = 120;
    const barHeight = 25;
    const startY = 180;
    const maxScore = 50;

    // Environnement
    const envWidth = Math.min(Math.abs(pollution) * (barWidth / maxScore), barWidth);
    ctx.fillStyle = pollution <= 0 ? '#10B981' : '#EF4444';
    ctx.fillRect(200, startY, envWidth, barHeight);
    ctx.fillStyle = '#E5E7EB';
    ctx.fillRect(200 + envWidth, startY, barWidth - envWidth, barHeight);
    
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('🌱 Environnement', 50, startY + 18);
    ctx.textAlign = 'right';
    ctx.fillText(`${pollution > 0 ? '+' : ''}${pollution}`, 180, startY + 18);

    // Économie
    const ecoWidth = Math.min(Math.abs(economy) * (barWidth / maxScore), barWidth);
    ctx.fillStyle = economy >= 0 ? '#3B82F6' : '#EF4444';
    ctx.fillRect(200, startY + 50, ecoWidth, barHeight);
    ctx.fillStyle = '#E5E7EB';
    ctx.fillRect(200 + ecoWidth, startY + 50, barWidth - ecoWidth, barHeight);
    
    ctx.fillStyle = '#1F2937';
    ctx.textAlign = 'left';
    ctx.fillText('💰 Économie', 50, startY + 68);
    ctx.textAlign = 'right';
    ctx.fillText(`${economy > 0 ? '+' : ''}${economy}`, 180, startY + 68);

    // Popularité
    const popWidth = Math.min(Math.abs(popularity) * (barWidth / maxScore), barWidth);
    ctx.fillStyle = popularity >= 0 ? '#8B5CF6' : '#EF4444';
    ctx.fillRect(200, startY + 100, popWidth, barHeight);
    ctx.fillStyle = '#E5E7EB';
    ctx.fillRect(200 + popWidth, startY + 100, barWidth - popWidth, barHeight);
    
    ctx.fillStyle = '#1F2937';
    ctx.textAlign = 'left';
    ctx.fillText('👥 Popularité', 50, startY + 118);
    ctx.textAlign = 'right';
    ctx.fillText(`${popularity > 0 ? '+' : ''}${popularity}`, 180, startY + 118);

    // Message de conclusion
    ctx.fillStyle = overall.bgColor;
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Merci d\'avoir joué !', 250, 360);

    // Date
    ctx.fillStyle = '#6B7280';
    ctx.font = '12px Arial';
    ctx.fillText(new Date().toLocaleDateString('fr-FR'), 250, 380);

    setImageGenerated(true);
  };

  useEffect(() => {
    setTimeout(() => {
      generateEnhancedImage();
    }, 500);
  }, []);

  const downloadImage = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'planete-ou-profit-resultat.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Planète ou Profit - Mes résultats',
        text: `J'ai terminé le jeu "Planète ou Profit" avec le profil ${getOverallRating().rating} !`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  const overall = getOverallRating();
  const envAnalysis = getScoreAnalysis(player.scores.pollution, 'pollution');
  const ecoAnalysis = getScoreAnalysis(player.scores.economy, 'economy');
  const popAnalysis = getScoreAnalysis(player.scores.popularity, 'popularity');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header avec animation */}
      <div className="text-center bg-white rounded-xl shadow-lg p-8">
        <div className="animate-bounce mb-4">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🎉 Résultats Finaux</h1>
        <p className="text-xl text-gray-600">Découvrez l'impact de vos décisions</p>
      </div>

      {/* Profil principal */}
      <div className={`bg-gradient-to-r ${overall.gradient} text-white rounded-xl shadow-lg p-8`}>
        <div className="flex items-center justify-center mb-6">
          <div className="bg-white bg-opacity-20 rounded-full p-4 mr-4">
            {overall.icon}
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">{overall.rating}</h2>
            <p className="text-lg opacity-90">{overall.desc}</p>
          </div>
        </div>
      </div>

      {/* Analyse détaillée des scores */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-emerald-100 rounded-full p-3 mr-4">
              <Leaf className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Environnement</h3>
              <p className="text-2xl font-bold text-gray-800">
                {player.scores.pollution > 0 ? '+' : ''}{player.scores.pollution}
              </p>
            </div>
          </div>
          <div className={`${envAnalysis.bg} rounded-lg p-3`}>
            <p className={`font-semibold ${envAnalysis.color}`}>{envAnalysis.level}</p>
            <p className="text-sm text-gray-600">{envAnalysis.desc}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 rounded-full p-3 mr-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Économie</h3>
              <p className="text-2xl font-bold text-gray-800">
                {player.scores.economy > 0 ? '+' : ''}{player.scores.economy}
              </p>
            </div>
          </div>
          <div className={`${ecoAnalysis.bg} rounded-lg p-3`}>
            <p className={`font-semibold ${ecoAnalysis.color}`}>{ecoAnalysis.level}</p>
            <p className="text-sm text-gray-600">{ecoAnalysis.desc}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 rounded-full p-3 mr-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Popularité</h3>
              <p className="text-2xl font-bold text-gray-800">
                {player.scores.popularity > 0 ? '+' : ''}{player.scores.popularity}
              </p>
            </div>
          </div>
          <div className={`${popAnalysis.bg} rounded-lg p-3`}>
            <p className={`font-semibold ${popAnalysis.color}`}>{popAnalysis.level}</p>
            <p className="text-sm text-gray-600">{popAnalysis.desc}</p>
          </div>
        </div>
      </div>

      {/* Historique des décisions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Award className="w-6 h-6 mr-3 text-yellow-500" />
          Récapitulatif de vos décisions
        </h3>
        <div className="space-y-4">
          {player.decisions.map((decision, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border-l-4 border-emerald-500">
              <div className="flex items-start">
                <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{decision}</p>
                  <p className="text-sm text-gray-500 mt-1">Scénario {index + 1}/5</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image générée */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🎨 Votre certificat de résultat
        </h3>
        <div className="text-center">
          <canvas
            ref={canvasRef}
            className="border-2 border-gray-200 rounded-lg shadow-lg mx-auto"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <p className="text-sm text-gray-500 mt-4">
            Cette image résume visuellement vos performances dans le jeu
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={downloadImage}
            className="flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Télécharger l'image
          </button>
          
          <button
            onClick={shareResults}
            className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Partager mes résultats
          </button>
          
          <button
            onClick={onRestart}
            className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Rejouer
          </button>
          
          <button
            onClick={onHome}
            className="flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-4 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};