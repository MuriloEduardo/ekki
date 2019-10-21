export function createContactRequest(contact) {
    return {
        type: '@contact/CREATE_CONTACT_REQUEST',
        payload: { contact },
    };
}

export function createContactSuccess(contact) {
    return {
        type: '@contact/CREATE_CONTACT_SUCCESS',
        payload: { contact },
    };
}

export function createContactFailure() {
    return {
        type: '@contact/CREATE_CONTACT_FAILURE',
    };
}

/**
 * Index
 */
export function loadContactRequest() {
    return {
        type: '@contact/LOAD_CONTACT_REQUEST',
    };
}

export function loadContactSuccess(contacts) {
    return {
        type: '@contact/LOAD_CONTACT_SUCCESS',
        payload: { contacts },
    };
}

export function loadContactFailure() {
    return {
        type: '@contact/LOAD_CONTACT_FAILURE',
    };
}

/**
 * Destroy
 */
export function destroyContactRequest(contact) {
    return {
        type: '@contact/DESTROY_CONTACT_REQUEST',
        payload: { contact },
    };
}

export function destroyContactSuccess(contact) {
    return {
        type: '@contact/DESTROY_CONTACT_SUCCESS',
        payload: { contact },
    };
}

export function destroyContactFailure() {
    return {
        type: '@contact/DESTROY_CONTACT_FAILURE',
    };
}
