import React, { Component } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { FaSearch, FaUserPlus } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as UsersActions from '~/store/modules/search_users/actions';
import * as ContactsActions from '~/store/modules/contacts/actions';
import * as TransferActions from '~/store/modules/transfer/actions';

class SearchUsers extends Component {
    onChange = e => {
        const { searchUsersRequest } = this.props;

        searchUsersRequest(e.target.value);
    };

    render() {
        const { findings, createContactRequest, setUser } = this.props;

        return (
            <div>
                <span>Pesquisar por todos os usuários</span>
                <Form className="form-search">
                    <FaSearch />
                    <Input
                        type="search"
                        name="search"
                        placeholder="Digite para pesquisar..."
                        onChange={this.onChange}
                    />
                </Form>
                <p>{findings.length} usuário(s) encontrado(s)</p>
                <div>
                    {findings.map(finding => (
                        <div key={finding.id} className="card">
                            <div className="infos">
                                <div className="avatar">
                                    {finding.name.charAt(0)}
                                </div>
                                <div>
                                    <h4>{finding.name}</h4>
                                    <div>{finding.cpf}</div>
                                    <div>{finding.phone}</div>
                                </div>
                            </div>
                            <div className="actions">
                                <button
                                    type="button"
                                    onClick={() =>
                                        createContactRequest(finding)
                                    }
                                >
                                    <FaUserPlus />
                                    <span>Adicionar como contato</span>
                                </button>
                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={() => setUser(finding)}
                                >
                                    Transferir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

SearchUsers.propTypes = {
    findings: PropTypes.arrayOf(PropTypes.object).isRequired,
    searchUsersRequest: PropTypes.func.isRequired,
    createContactRequest: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    findings: state.searchUsers.findings,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        { ...UsersActions, ...ContactsActions, ...TransferActions },
        dispatch
    );

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SearchUsers)
);
