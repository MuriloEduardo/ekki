// import request from 'supertest';
// import app from '../../src/app';

// import factory from '../factories';

import truncate from '../util/truncate';

describe('Transaction', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('isso deve ser true', () => {
    const verdadeiro = true;

    expect(verdadeiro).toBe(true);
  });
});
