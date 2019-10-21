import produce from 'immer';

const INITIAL_STATE = {
    user: {},
    transfers: [],
    loading: false,
};

export default function transfer(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@transfer/SET_USER':
                draft.user = action.payload.user;
                break;
            case '@transfer/LOAD_TRANSFERS_REQUEST':
                draft.loading = true;
                break;
            case '@transfer/LOAD_TRANSFERS_SUCCESS':
                draft.loading = false;
                draft.transfers = action.payload.transfers;
                break;
            default:
        }
    });
}
