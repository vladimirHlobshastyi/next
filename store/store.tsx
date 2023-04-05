import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cartSlice from './cart/cartSlice'
import compareSlice from './compare/compareSlice'
import favoritesSlice from './favorites/favoritesSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import session from 'redux-persist/lib/storage/session';
import authSlice from './auth/authSlice';
import userContactsSlice from './userContactsSlice/userContactsSlice';

const cartPersistConfig = {
    key: "cart",
    storage: session,
};

const favoritesPersistConfig = {
    key: "favorites",
    storage: session,
};

const comparePersistConfig = {
    key: "compare",
    storage: session,
};

const persistConfig = {
    key: 'root',
    storage: session,
    whitelist: ["cart", "favorites", "compare"],
};
const rootReducer = combineReducers({
    cart: persistReducer(cartPersistConfig, cartSlice),
    favorites: persistReducer(favoritesPersistConfig, favoritesSlice),
    compare: persistReducer(comparePersistConfig, compareSlice),
    auth: authSlice,
    userContacts: userContactsSlice
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
