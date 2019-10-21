import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
    try {
        const { cpf, password } = payload;

        const response = yield call(api.post, 'sessions', {
            cpf,
            password,
        });

        const { token, user } = response.data;

        api.defaults.headers.Authorization = `Bearer ${token}`;

        yield put(signInSuccess(token, user));

        toast.success('Seja bem-vindo!');

        history.push('/');
    } catch (error) {
        toast.error('Falha na autenticação, verifique seus dados');

        yield put(signFailure());
    }
}

export function* signUp({ payload }) {
    try {
        const { name, cpf, password } = payload;

        yield call(api.post, 'users', {
            name,
            cpf,
            password,
        });

        toast.success('Cadastrado efetuado com sucesso');

        history.push('/');
    } catch (error) {
        toast.error('Falha no cadastro, verifique seus dados');

        yield put(signFailure());
    }
}

export function setToken({ payload }) {
    if (!payload) return;

    const { token } = payload.auth;

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export function signOut() {
    history.push('/login');
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut),
]);
