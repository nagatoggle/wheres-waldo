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
          clickX: 96.354,
          clickY: 53.922
        });

      expect(response.status).toBe(200);
      expect(response.body.found).toBe(true);
    });

    it('should return `found: false` when incorrect coordinates are sent', async () => {
      const response = await request(app)
        .post('/api/validate')
        .send({
          id: 'wally',
          clickX: 0,
          clickY: 0
        });

      expect(response.status).toBe(200);
      expect(response.body.found).toBe(false);
    });
  });
});