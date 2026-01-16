import { useState, useEffect } from 'react';
import { Outlet } from "react-router";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [boardUrl, setBoardUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('/api/landing', { method: 'POST' });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        setCharacters(result.characters);
        setBoardUrl(result.boardUrl);

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <Outlet context={{ characters, boardUrl, loading, error }} />
  );
}