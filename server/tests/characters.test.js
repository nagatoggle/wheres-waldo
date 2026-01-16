import { describe, it, expect } from 'vitest';
import { validateCoords } from '../src/models/characters.js';

describe('validateCoords()', () => {
  it('should return true if coordinates are within the area', () => {
    expect(validateCoords('wally', 1850, 550)).toBe(true);
  });

  it('should return false if coordinates are outside the area', () => {
    expect(validateCoords('wally', 0, 0)).toBe(false);
  });
});