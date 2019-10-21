import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import contact from './contacts/sagas';
import search_users from './search_users/sagas';
import transfer from './transfer/sagas';

export default function* rootSaga() {
    return yield all([auth, user, contact, search_users, transfer]);
}
