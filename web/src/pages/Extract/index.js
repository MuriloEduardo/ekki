import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Currency from 'react-currency-formatter';

import * as TransferActions from '~/store/modules/transfer/actions';

import './styles.css';

class Extract extends Component {
    componentDidMount() {
        const { loadTransfersRequest } = this.props;

        loadTransfersRequest();
    }

    render() {
        const { transfers, user } = this.props;

        return (
            <>
                <h2>Extrato</h2>
                <div className="table-responsive">
                    <table className="tableExtract">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transfers.map(transfer => (
                                <tr key={transfer.id}>
                                    <td>{transfer.id}</td>
                                    <td>
                                        {transfer.user_id === user.id
                                            ? `Enviado para ${transfer.favored.name}`
                                            : `Recebido de ${transfer.user.name}`}
                                    </td>
                                    <td>
                                        <div>
                                            <span>
                                                <Currency
                                                    quantity={transfer.amount} // Required
                                                    symbol={
                                                        transfer.user_id ===
                                                        user.id
                                                            ? 'R$ -'
                                                            : 'R$'
                                                    }
                                                />
                                            </span>
                                        </div>
                                    </td>
                                    <td>{transfer.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

Extract.propTypes = {
    transfers: PropTypes.arrayOf(PropTypes.object).isRequired,
    user: PropTypes.instanceOf(Object).isRequired,
    loadTransfersRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    transfers: state.transfer.transfers,
    user: state.user.profile,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(TransferActions, dispatch);

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Extract)
);
