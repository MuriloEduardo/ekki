export function searchUsersRequest(name) {
    return {
        type: '@searchUsers/SEARCH_USERS_REQUEST',
        payload: { name },
    };
}

export function searchUsersSuccess(users) {
    return {
        type: '@searchUsers/SEARCH_USERS_SUCCESS',
        payload: users,
    };
}

export function searchUsersFailure() {
    return {
        type: '@searchUsers/SEARCH_USERS_FAILURE',
    };
}
