import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';

import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  /**
   * INDEX
   */
  it('it is possible to list users', async () => {
    const user = await factory.create('User');

    console.log('teste', user, user.generateToken());

    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  /**
   * STORE
   */
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

  /**
   * UPDATE
   */
  it('não é possivel editar a senha sem a senha antiga', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .put('/users')
      .send(user);

    expect(response.status).toBe(401);
  });

  // it('não é possivel editar a senha sem a confirmação de senha', async () => {});

  /**
   * DESTROY
   */
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
