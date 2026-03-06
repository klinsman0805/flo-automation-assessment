import { test, expect } from '@playwright/test';

test.describe('Backend API', () => {
  test('GET /api/usage returns JSON with a records array', async ({ request }) => {
    const response = await request.get('/api/usage');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('records');
    expect(Array.isArray(body.records)).toBe(true);
  });

  test('POST /api/usage rejects invalid data with 400', async ({ request }) => {
    const bad = { foo: 'bar' };
    const r = await request.post('/api/usage', { data: bad });
    expect(r.status()).toBe(400);
  });

  test('POST /api/usage accepts well-formed record', async ({ request }) => {
    const record = {
      nmi: 'NEM1234567',
      timestamp: new Date().toISOString(),
      unit: 'kWh',
      consumption: 3.14,
      id: 'record-test-' + Date.now(),
    };

    const r = await request.post('/api/usage', { data: record });
    expect(r.status()).toBe(200);
    const body = await r.json();
    expect(body.message).toMatch(/success/i);
  });
});
