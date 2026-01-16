import { useState, useEffect } from 'react';

export const useGameSession = () => {
  const [sid, setSid] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/start', { method: 'POST' });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        setSid(result.sid);

      } catch (err) {
        console.error('sessionId取得時エラー: ', err.message);
      }
    };

    fetchSession();
  }, []);

  return { sid };
}