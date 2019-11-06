import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  describe('INDEX', () => {
    it('is possible to list users with token', async () => {
      const user = await factory.create('User');

      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${user.generateToken()}`);

      expect(response.status).toBe(200);
    });

    it('is not possible to list users without token', async () => {
      const response = await request(app).get('/users');

      expect(response.status).toBe(401);
    });

    it('is possible to search users with token', async () => {
      const user = await factory.create('User');

      const response = await request(app)
        .get('/users?search=Murilo')
        .set('Authorization', `Bearer ${user.generateToken()}`);

      expect(response.status).toBe(200);
    });
  });

  describe('STORE', () => {
    it('should be able to register', async () => {
      const user = await factory.attrs('User', {
        cpf: '02237841098',
      });

      const response = await request(app)
        .post('/users')
        .send(user);

      expect(response.body).toHaveProperty('id');
    });

    it('should not be able to register with duplicate cpf', async () => {
      const user = await factory.attrs('User');

      await request(app)
        .post('/users')
        .send(user);

      const response = await request(app)
        .post('/users')
        .send(user);

      expect(response.status).toBe(400);
    });

    it('should not be able to register with missing data', async () => {
      const user = await factory.attrs('User', {
        cpf: null,
      });

      const response = await request(app)
        .post('/users')
        .send(user);

      expect(response.status).toBe(400);
    });
  });

  describe('UPDATE', () => {
    it('não é possivel criar nova senha sem informar a anterior juntamente com sua confirmação', async () => {
      const user = await factory.create('User', { password: 'abc123' });

      const response = await request(app)
        .put('/users')
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send({
          cpf: user.cpf,
          password: 'abc12356',
          oldPassword: 'abc123',
        });

      expect(response.status).toBe(400);
    });

    // it('não é possivel editar a senha sem a confirmação de senha', async () => {});
  });

  describe('DESTROY', () => {
    it('it is possible delete users', async () => {
      const user = await factory.create('User', {
        password: 'abc123',
      });

      const response = await request(app)
        .delete('/users')
        .set('Authorization', `Bearer ${user.generateToken()}`);

      expect(response.status).toBe(200);
    });
  });
});
