import React from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
    const profile = useSelector(state => state.user.profile);

    return (
        <>
            <h2>Home</h2>
            <p>
                Número da conta: <strong>{profile.id}</strong>
            </p>
            <br />
            <div className="card">
                <p>
                    <strong>{profile.balance}</strong>
                </p>
                <span>Saldo</span>
            </div>
            <div className="card">
                <p>
                    <strong>{profile.credit}</strong>
                </p>
                <span>Limite</span>
            </div>
        </>
    );
}
