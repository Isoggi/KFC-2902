import nock from 'nock';
describe('test login', () => {
  it('should return token', async () => {
    nock('http://localhost:8000/')
      .post('api/auth/v1', {
        phone_number: '0819299001122',
        password: 'Password123',
      })
      .reply(200);
  });
});
