import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import './styles.css';

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);

    function handleSubmit(data) {
        dispatch(updateProfileRequest(data));
    }

    function handleSignOut() {
        dispatch(signOut());
    }

    return (
        <>
            <h2>Perfil</h2>
            <br />
            <Form initialData={profile} onSubmit={handleSubmit}>
                <Input name="name" placeholder="Nome completo" />
                <Input name="cpf" placeholder="Seu CPF" />
                <Input name="phone" type="tel" placeholder="Seu celular" />
                <hr />
                <Input
                    type="password"
                    name="oldPassword"
                    placeholder="Sua senha atual"
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Nova senha"
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmação de senha"
                />

                <button type="submit" className="btn-primary">
                    Atualizar perfil
                </button>
            </Form>
            <button
                type="button"
                onClick={handleSignOut}
                className="btn-danger"
            >
                Sair
            </button>
        </>
    );
}
