import React from 'react';
import { Link } from 'react-router-dom';

import SearchUsers from '~/components/SearchUsers';

export default function CreateContacts() {
    return (
        <div className="contacts">
            <div className="contacts-header">
                <h2>Novo Contato</h2>
                <Link to="/contacts">Voltar</Link>
            </div>
            <SearchUsers />
        </div>
    );
}
