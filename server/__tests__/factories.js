import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';

factory.define('User', User, {
  name: faker.name.findName(),
  cpf: faker.random.uuid(),
  phone: faker.phone.phoneNumber(),
  password: faker.internet.password(),
});

export default factory;
