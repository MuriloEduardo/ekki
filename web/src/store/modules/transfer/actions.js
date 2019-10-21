export function setUser(user) {
    return {
        type: '@transfer/SET_USER',
        payload: { user },
    };
}

export function transferRequest(transfer) {
    return {
        type: '@transfer/TRANSFER_REQUEST',
        payload: { transfer },
    };
}

export function transferSuccess(transfer) {
    return {
        type: '@transfer/TRANSFER_SUCCESS',
        payload: { transfer },
    };
}

export function transferFailure() {
    return {
        type: '@transfer/TRANSFER_FAILURE',
    };
}

/**
 * Index
 */
export function loadTransfersRequest() {
    return {
        type: '@transfer/LOAD_TRANSFERS_REQUEST',
    };
}

export function loadTransfersSuccess(transfers) {
    return {
        type: '@transfer/LOAD_TRANSFERS_SUCCESS',
        payload: { transfers },
    };
}

export function loadTransfersFailure() {
    return {
        type: '@transfer/LOAD_TRANSFERS_FAILURE',
    };
}
