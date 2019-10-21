import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import './styles.css';

import SearchUsers from '~/components/SearchUsers';

import * as TransferActions from '~/store/modules/transfer/actions';

class Transfer extends Component {
    componentDidMount() {}

    handleSubmit = ({ value }) => {
        const { transferRequest, transferUser } = this.props;

        transferRequest({ favored_id: transferUser.id, amount: value });
    };

    render() {
        const { transferUser } = this.props;

        return (
            <>
                <h2>Transferir</h2>
                <SearchUsers />
                <br />
                <br />
                <div>
                    <h4>Transferir para</h4>
                    <strong>{transferUser.name}</strong>
                </div>
                <div className="contact-infos">
                    <div>
                        <span>Conta</span>
                        <h4>{transferUser.id}</h4>
                    </div>
                    <div>
                        <span>CPF</span>
                        <h4>{transferUser.cpf}</h4>
                    </div>
                    <div>
                        <span>Telefone</span>
                        <h4>{transferUser.phone}</h4>
                    </div>
                </div>
                <hr />
                <br />
                <Form onSubmit={this.handleSubmit}>
                    <div>
                        <span>Valor</span>
                        <Input
                            type="text"
                            name="value"
                            required
                            placeholder="R$ 0,00"
                        />
                    </div>
                    <button type="submit" className="btn-primary">
                        Transferir
                    </button>
                </Form>
            </>
        );
    }
}

Transfer.propTypes = {
    transferUser: PropTypes.instanceOf(Object).isRequired,
    transferRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    transferUser: state.transfer.user,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(TransferActions, dispatch);

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Transfer)
);
