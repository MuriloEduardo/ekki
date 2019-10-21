import produce from 'immer';

const INITIAL_STATE = {
    loading: false,
    findings: [],
};

export default function searchUsers(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@searchUsers/SEARCH_USERS_REQUEST':
                draft.loading = true;
                break;
            case '@searchUsers/SEARCH_USERS_SUCCESS':
                draft.findings = action.payload;
                draft.loading = false;
                break;
            case '@searchUsers/SEARCH_USERS_FAILURE':
                draft.findings = [];
                draft.loading = false;
                break;
            case '@contact/CREATE_CONTACT_SUCCESS':
                draft.findings = draft.findings.filter(finding => {
                    return finding.id !== action.payload.contact.contact_id;
                });
                break;
            case '@transfer/SET_USER':
                draft.findings = [];
                break;
            default:
        }
    });
}
