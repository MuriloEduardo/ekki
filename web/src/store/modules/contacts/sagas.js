import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
    createContactSuccess,
    createContactFailure,
    destroyContactSuccess,
    destroyContactFailure,
    loadContactSuccess,
    loadContactFailure,
} from './actions';

export function* loadContact() {
    try {
        const response = yield call(api.get, 'contacts');

        yield put(loadContactSuccess(response.data));
    } catch (error) {
        toast.error('Erro ao lostar os contatos');

        yield put(loadContactFailure());
    }
}

export function* createContact({ payload }) {
    try {
        const { id } = payload.contact;

        const response = yield call(api.post, 'contacts', { contact_id: id });

        toast.success('Contato criado com sucesso!');

        yield put(createContactSuccess(response.data));
    } catch (error) {
        toast.error('Erro ao criar contato');

        yield put(createContactFailure());
    }
}

export function* destroyContact({ payload }) {
    try {
        const { id } = payload.contact;

        yield call(api.delete, 'contacts', { data: { id } });

        toast.success('Contato removido com sucesso!');

        yield put(destroyContactSuccess(payload.contact));
    } catch (error) {
        toast.error('Erro ao remover contato');

        yield put(destroyContactFailure());
    }
}

export default all([
    takeLatest('@contact/LOAD_CONTACT_REQUEST', loadContact),
    takeLatest('@contact/CREATE_CONTACT_REQUEST', createContact),
    takeLatest('@contact/DESTROY_CONTACT_REQUEST', destroyContact),
]);
