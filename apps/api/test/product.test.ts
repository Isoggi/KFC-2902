import supertest from 'supertest';
import App from '../src/app';
describe('testing products', () => {
  it('should return array', async () => {
    const app = new App();
    const response = await supertest(app.getApp()).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body.data.length).toEqual(23);
  });
});
