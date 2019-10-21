import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';

import './styles.css';

export default function DefaultLayout({ children }) {
    return (
        <div className="default-wrapper">
            <Header />
            <section className="container">{children}</section>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
