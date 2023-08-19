import request from 'supertest';
import Server from './server';

describe('Express App', () => {
  let server: Server;

  beforeAll(async () => {
    server = await new Server();
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  it('should respond with "Hello, Express!" on the root route', async () => {
    const app = server.getApp(); // Get the Express app instance
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, Express!');
  });

  it('should return search results for valid search query', async () => {
    const app = server.getApp();
    const response = await request(app).get('/search?text=New');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(10);
  });

  it('should handle invalid search query', async () => {
    const app = server.getApp();
    const response = await request(app).get('/search?text=123445');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });
});