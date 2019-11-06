import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Contact', () => {
  beforeEach(async () => {
    await truncate();
  });

  describe('INDEX', () => {
    it('should be able list contacts', async () => {
      const user = await factory.create('User');

      const response = await request(app)
        .get('/contacts')
        .set('Authorization', `Bearer ${user.generateToken()}`);

      console.log(response);

      expect(response.status).toBe(200);
    });
  });
});
