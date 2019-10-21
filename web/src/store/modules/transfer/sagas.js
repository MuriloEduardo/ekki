import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';

import api from '~/services/api';

import {
    transferSuccess,
    transferFailure,
    loadTransfersSuccess,
    loadTransfersFailure,
} from './actions';

export function setUser() {
    history.push('/transfer');
}

export function* transfer({ payload }) {
    try {
        const response = yield call(api.post, 'transactions', payload.transfer);

        toast.success('Transferência efetuada com sucesso!');

        yield put(transferSuccess({ ...payload.transfer, ...response.data }));

        history.push('/extract');
    } catch (error) {
        toast.error(
            error.response.data.error || 'Erro ao efetuar transferência'
        );

        yield put(transferFailure());
    }
}

export function* transfers() {
    try {
        const response = yield call(api.get, 'transactions');

        yield put(loadTransfersSuccess(response.data));
    } catch (error) {
        toast.error('Erro ao listar transferências');

        yield put(loadTransfersFailure());
    }
}

export default all([
    takeLatest('@transfer/SET_USER', setUser),
    takeLatest('@transfer/TRANSFER_REQUEST', transfer),
    takeLatest('@transfer/LOAD_TRANSFERS_REQUEST', transfers),
]);
