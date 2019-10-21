import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    cpf: Yup.string().required('O CPF é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
});

export default function SignUp() {
    const dispatch = useDispatch();

    function handleSubmit({ name, cpf, password }) {
        dispatch(signUpRequest(name, cpf, password));
    }

    return (
        <>
            <h2>Cadastre-se</h2>
            <Form schema={schema} onSubmit={handleSubmit}>
                <Input type="text" name="name" placeholder="Nome completo" />
                <Input type="text" name="cpf" placeholder="Seu CPF" />
                <Input
                    type="password"
                    name="password"
                    placeholder="Sua senha secreta"
                />

                <button type="submit">Criar conta</button>
                <br />
                <Link to="/login">Já tenho login</Link>
            </Form>
        </>
    );
}
