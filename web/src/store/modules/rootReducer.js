import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import contacts from './contacts/reducer';
import searchUsers from './search_users/reducer';
import transfer from './transfer/reducer';

export default combineReducers({
    auth,
    user,
    contacts,
    searchUsers,
    transfer,
});
