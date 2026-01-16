import path from 'node:path';
import { readFileSync } from 'node:fs';

const DATA_FILE = process.env.DATA_FILE || 'characters.json';

function readJsonFile(name) {
  const filePath = path.join(import.meta.dirname, '../data', name);
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

export function validateCoords(id, clickX, clickY) {
  const character = charactersData.characters.find(c => c.id === id);
  if (!character) return false;

  const { x_min, y_min, x_max, y_max } = character;

  const isInsideX = clickX >= x_min && clickX <= x_max;
  const isInsideY = clickY >= y_min && clickY <= y_max;

  return isInsideX && isInsideY;
}