import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
    const persistedReducer = persistReducer(
        {
            key: 'ekki',
            storage,
            whitelist: ['auth', 'user', 'transfer'],
        },
        reducers
    );

    return persistedReducer;
};
