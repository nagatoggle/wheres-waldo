import path from 'node:path';
import { readFileSync } from 'node:fs';

const DATA_FILE = process.env.DATA_FILE || 'characters.json';

function readJsonFile(name) {
  const serverSrcDir = path.dirname(import.meta.dirname);
  const filePath = path.join(serverSrcDir, 'data', name);
  const file = readFileSync(filePath, 'utf8');
  return JSON.parse(file);
}

const charactersData = readJsonFile(DATA_FILE);

export function getBoardUrl() {
  return charactersData.boardUrl;
}

export function getCharacterList() {
  return charactersData.characters.map(c => ({
    id: c.id,
    name: c.name,
    imageUrl: c.imageUrl
  }));
}

export function validateCoords(id, x, y) {
  const character = charactersData.characters.find(c => c.id === id);
  if (!character) return false;

  const { xMin, yMin, xMax, yMax } = character;

  const isInsideX = x >= xMin && x <= xMax;
  const isInsideY = y >= yMin && y <= yMax;

  return isInsideX && isInsideY;
}