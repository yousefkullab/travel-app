
import request from 'supertest';
import app from '../src/server/server';

describe('Server endpoints', () => {
    it('responds with status 200 on /test endpoint', async () => {
        const response = await request(app).get('/test');
        expect(response.status).toBe(200);
    });
});