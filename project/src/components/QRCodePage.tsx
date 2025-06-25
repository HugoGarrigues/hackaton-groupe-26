import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Share2, Download } from 'lucide-react';

interface QRCodePageProps {
  onBack: () => void;
}

export const QRCodePage: React.FC<QRCodePageProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fonction simplifiée pour générer un QR Code
  const generateQRCode = (text: string, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 200;
    canvas.width = size;
    canvas.height = size;

    // Fond blanc
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Pattern QR simplifié (simulation)
    ctx.fillStyle = '#000000';
    const blockSize = size / 21;

    // Coins de détection
    const corners = [
      { x: 0, y: 0 },
      { x: 14, y: 0 },
      { x: 0, y: 14 }
    ];

    corners.forEach(corner => {
      // Carré extérieur
      ctx.fillRect(corner.x * blockSize, corner.y * blockSize, 7 * blockSize, 7 * blockSize);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect((corner.x + 1) * blockSize, (corner.y + 1) * blockSize, 5 * blockSize, 5 * blockSize);
      ctx.fillStyle = '#000000';
      ctx.fillRect((corner.x + 2) * blockSize, (corner.y + 2) * blockSize, 3 * blockSize, 3 * blockSize);
    });

    // Pattern aléatoire simulé
    for (let i = 0; i < 21; i++) {
      for (let j = 0; j < 21; j++) {
        if (Math.random() > 0.5 && !isCornerArea(i, j)) {
          ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize);
        }
      }
    }
  };

  const isCornerArea = (x: number, y: number) => {
    return (x < 9 && y < 9) || (x > 12 && y < 9) || (x < 9 && y > 12);
  };

  useEffect(() => {
    if (canvasRef.current) {
      generateQRCode(window.location.href, canvasRef.current);
    }
  }, []);

  const downloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'planete-ou-profit-qr.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const shareQR = async () => {
    if (navigator.share && canvasRef.current) {
      try {
        canvasRef.current.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], 'qr-code.png', { type: 'image/png' });
            await navigator.share({
              title: 'Planète ou Profit',
              text: 'Jouez au jeu "Planète ou Profit" !',
              files: [file]
            });
          }
        });
      } catch (error) {
        console.log('Erreur lors du partage:', error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour
        </button>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">QR Code</h2>
        <p className="text-gray-600 mb-6">
          Scannez ce code pour accéder facilement au jeu
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6 inline-block">
          <canvas
            ref={canvasRef}
            className="border border-gray-200 rounded"
          />
        </div>

        <div className="text-sm text-gray-500 mb-6">
          {window.location.href}
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={downloadQR}
            className="flex items-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Télécharger
          </button>
          
          <button
            onClick={shareQR}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Partager
          </button>
        </div>
      </div>
    </div>
  );
};