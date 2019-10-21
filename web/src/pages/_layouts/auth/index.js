import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default function AuthLayout({ children }) {
    return (
        <div className="auth-wrapper">
            <h1>Ekki</h1>
            {children}
        </div>
    );
}

AuthLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
