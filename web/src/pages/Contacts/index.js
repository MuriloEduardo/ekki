import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { FaHandHoldingUsd, FaUserPlus, FaTrash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ContactsActions from '~/store/modules/contacts/actions';
import * as TransferActions from '~/store/modules/transfer/actions';

import './styles.css';

class Contacts extends Component {
    componentDidMount() {
        const { loadContactRequest } = this.props;

        loadContactRequest();
    }

    render() {
        const { contacts, destroyContactRequest, setUser } = this.props;

        return (
            <div className="contacts">
                <div className="header">
                    <h2>Seus Contatos</h2>
                    <Link
                        to="/contacts/create"
                        className="new-contact btn-link"
                    >
                        <FaUserPlus />
                        <span>Novo contato</span>
                    </Link>
                </div>
                <p>{contacts.length} registros encontrados</p>
                <div>
                    {contacts.map(contact => (
                        <div key={contact.id} className="card">
                            <div className="infos">
                                <div className="avatar">
                                    {contact.contact.name.charAt(0)}
                                </div>
                                <div>
                                    <h4>{contact.contact.name}</h4>
                                    <h5>{contact.contact.cpf}</h5>
                                    <h6>{contact.contact.phone}</h6>
                                </div>
                            </div>
                            <div className="actions">
                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={() => setUser(contact.contact)}
                                >
                                    <FaHandHoldingUsd />
                                </button>
                                <button
                                    type="button"
                                    className="btn-danger"
                                    onClick={() =>
                                        destroyContactRequest(contact)
                                    }
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

Contacts.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
    loadContactRequest: PropTypes.func.isRequired,
    destroyContactRequest: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    contacts: state.contacts.list,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...ContactsActions, ...TransferActions }, dispatch);

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Contacts)
);
