import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
    cpf: Yup.string().required('O CPF é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    function handleSubmit({ cpf, password }) {
        dispatch(signInRequest(cpf, password));
    }

    return (
        <>
            <h2>Entrar</h2>
            <Form schema={schema} onSubmit={handleSubmit}>
                <Input type="text" name="cpf" placeholder="Seu CPF" />
                <Input
                    type="password"
                    name="password"
                    placeholder="Sua Senha"
                />
                <button type="submit">
                    {loading ? 'Carregando...' : 'Acessar'}
                </button>
                <br />
                <Link to="/register">Criar conta gratuita</Link>
            </Form>
        </>
    );
}
