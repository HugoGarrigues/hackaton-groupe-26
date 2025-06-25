import React, { useState } from 'react';
import { Choice, Scenario } from '../types/game';
import { ArrowRight } from 'lucide-react';

interface ScenarioCardProps {
  scenario: Scenario;
  onChoice: (choice: Choice) => void;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onChoice }) => {
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleChoiceSelect = (choice: Choice) => {
    setSelectedChoice(choice);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (selectedChoice) {
      onChoice(selectedChoice);
      setShowFeedback(false);
      setSelectedChoice(null);
    }
  };

  if (showFeedback && selectedChoice) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Votre décision</h3>
          <div className="bg-emerald-50 rounded-lg p-4 mb-4">
            <p className="font-medium text-emerald-800 mb-2">{selectedChoice.text}</p>
            <p className="text-emerald-700 text-sm">{selectedChoice.description}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700">{selectedChoice.feedback}</p>
          </div>

          <button
            onClick={handleNext}
            className="flex items-center justify-center bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium mx-auto"
          >
            Continuer
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{scenario.title}</h3>
        <p className="text-gray-600 leading-relaxed">{scenario.description}</p>
      </div>

      <div className="space-y-4">
        {scenario.choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => handleChoiceSelect(choice)}
            className="w-full text-left bg-gradient-to-r from-emerald-50 to-blue-50 hover:from-emerald-100 hover:to-blue-100 rounded-lg p-4 border border-gray-200 hover:border-emerald-300 transition-all duration-200 transform hover:scale-[1.01]"
          >
            <h4 className="font-bold text-gray-800 mb-2">{choice.text}</h4>
            <p className="text-sm text-gray-600">{choice.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};