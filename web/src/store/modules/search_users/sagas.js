import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { searchUsersSuccess, searchUsersFailure } from './actions';

export function* searchUsers({ payload }) {
    try {
        const { name } = payload;

        const response = yield call(api.get, `users?search=${name}`);

        yield put(searchUsersSuccess(response.data));
    } catch (error) {
        toast.error('Erro ao buscar por usuários, busque por outros nomes');

        yield put(searchUsersFailure());
    }
}

export default all([
    takeLatest('@searchUsers/SEARCH_USERS_REQUEST', searchUsers),
]);
