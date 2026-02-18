import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('API Integration Tests', () => {
  describe('POST /api/validate', () => {
    it('should return `found: true` when correct coordinates are sent', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({
          id: 'wally',
          x: 96.354,
          y: 53.922
        });

      expect(response.status).toBe(200);
      expect(response.body.found).toBe(true);
    });

    it('should return `found: false` when incorrect coordinates are sent', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({
          id: 'wally',
          x: 0,
          y: 0
        });

      expect(response.status).toBe(200);
      expect(response.body.found).toBe(false);
    });
  });
});