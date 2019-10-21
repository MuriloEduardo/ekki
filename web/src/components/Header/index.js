import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Header() {
    const profile = useSelector(state => state.user.profile);

    return (
        <header>
            <nav>
                <h1>Ekki</h1>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/contacts">Contatos</Link>
                    </li>
                    <li>
                        <Link to="/extract">Extrato</Link>
                    </li>
                    <li>
                        <Link to="/transfer">Trânsferir</Link>
                    </li>
                </ul>
            </nav>
            <aside>
                <div>
                    <Link to="/profile" title="Editar seu perfil">
                        <span>
                            Olá, <strong>{profile.name}</strong>!
                        </span>
                        <div className="avatar">{profile.name.charAt(0)}</div>
                    </Link>
                </div>
            </aside>
        </header>
    );
}
