import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { useGameSession } from './hooks/useGamesession';
import GameBoard from './GameBoard';
import Modal from './components/Modal';
import styles from './Game.module.css';

export default function Game() {
  const { sid } = useGameSession();
  const { characters: masterCharacters, boardUrl } = useOutletContext();

  const [foundIds, setFoundIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameResult, setGameResult] = useState(null);

  const charas = masterCharacters.map(masterChara => ({
    ...masterChara,
    isFound: foundIds.includes(masterChara.id)
  }));

  const handleCharaSelect = async (clickCharaId, clickX, clickY) => {
    try {
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: clickCharaId,
          clickX: clickX,
          clickY: clickY
        })
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      if (result.found) {
        const nextFoundIds = [...foundIds, clickCharaId];
        setFoundIds(nextFoundIds);

        const isGameover = nextFoundIds.length === masterCharacters.length;
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
      <GameBoard charas={charas} onSelect={handleCharaSelect} boardUrl={boardUrl} />

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