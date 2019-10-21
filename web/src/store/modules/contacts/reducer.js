import produce from 'immer';

const INITIAL_STATE = {
    list: [],
};

export default function contacts(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@contact/LOAD_CONTACT_SUCCESS':
                draft.list = action.payload.contacts;
                break;
            case '@contact/CREATE_CONTACT_SUCCESS':
                draft.list = [...draft.list, action.payload.contact];
                break;
            case '@contact/DESTROY_CONTACT_SUCCESS':
                draft.list = [
                    ...draft.list.filter(
                        contact => contact.id !== action.payload.contact.id
                    ),
                ];
                break;
            default:
        }
    });
}
