import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { useGameSession } from './hooks/useGamesession';
import GameBoard from './GameBoard';
import Modal from './components/Modal';
import styles from './Game.module.css';

export default function Game() {
  const { sid } = useGameSession();
  const { characters: masterCharas, boardUrl } = useOutletContext();

  const [foundCharas, setFoundCharas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameResult, setGameResult] = useState(null);

  const charas = masterCharas.map(mc => {
    const isFound = foundCharas.some(fc => fc.id === mc.id);

    return {
      ...mc,
      isFound
    }
  });

  const handleCharaSelect = async (clickCharaId, x, y) => {
    try {
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: clickCharaId,
          x,
          y
        })
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      if (result.found) {
        const nextFoundCharas = [
          ...foundCharas,
          {
            id: clickCharaId,
            x,
            y
          }
        ];
        setFoundCharas(nextFoundCharas);

        const isGameover = nextFoundCharas.length === masterCharas.length;
        if (isGameover) {
          endGame();
        }
      }

    } catch (err) {
      console.error(err.message);
    }
  };

  const endGame = async () => {
    try {
      const response = await fetch('/api/end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sid })
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setGameResult(result);
      setIsModalOpen(true);

    } catch (err) {
      console.error(err.message);
    }
  }

  const handleRecordName = async (name) => {
    try {
      const response = await fetch('/api/record', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sid, name })
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        return true;
      }

    } catch (err) {
      console.error(err.message);
      return false;
    }
  }

  return (
    <div className={styles.fadeIn}>
      <GameBoard charas={charas} foundCharas={foundCharas} onSelect={handleCharaSelect} boardUrl={boardUrl} />

      {gameResult && (
        <Modal
          gameResult={gameResult}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onRecordName={handleRecordName}
        />
      )}
    </div>
  );
}