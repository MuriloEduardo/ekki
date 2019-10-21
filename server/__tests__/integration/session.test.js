import request from 'supertest';
import bcrypt from 'bcryptjs';

import app from '../../src/app';

import factory from '../factories';

import truncate from '../util/truncate';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: 'abc123',
    });

    const compareHash = await bcrypt.compare('abc123', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should not be able to create session with cpf nonexistent', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/sessions')
      .send(user);

    expect(response.status).toBe(401);
  });

  it('should not be able to create session with wrong password', async () => {
    const user = await factory.create('User', {
      password: 'abc123',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        cpf: user.cpf,
        password: 'abc1234',
      });

    expect(response.status).toBe(401);
  });
});
