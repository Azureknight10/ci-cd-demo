const request = require('supertest');
const app = require('../app');

describe('Tasks API', () => {
  it('returns empty tasks array initially', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('tasks');
    expect(Array.isArray(res.body.tasks)).toBe(true);
  });

  it('creates a new task via POST /tasks', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ text: 'Write my first CI test' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('text', 'Write my first CI test');
  });

  it('returns 400 if text is missing', async () => {
    const res = await request(app).post('/tasks').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
