import supertest from 'supertest';
import App from '../src/app';
import prisma from '../src/prisma';
describe('testing categories', () => {
  it('should return array', async () => {
    const app = new App();
    const response = await supertest(app.getApp()).get('/api/categories');
    expect(response.status).toBe(200);
    expect(response.body.data.length).toEqual(6);
  });
});

describe('create category', () => {
  const data = {
    id: 1000000,
    category: 'test',
    image: 'test.jpeg',
  };

  beforeAll(async () => {
    prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.category.create({
      data,
    });
  });

  afterEach(async () => {
    await prisma.category.delete({
      where: {
        id: data.id,
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create category', async () => {
    const app = new App();
    const response = await supertest(app.getApp()).get('/api/categories');
    expect(response.status).toBe(200);
    expect(
      response.body.data?.find((_: any) => _.category === 'test').category,
    ).toEqual(data.category);
  });
});
