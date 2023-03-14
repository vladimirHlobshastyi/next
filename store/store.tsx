/* import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cartSlice from './cart/cartSlice'
import compareSlice from './compare/compareSlice'
import favoritesSlice from './favorites/favoritesSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["cart", "favorites", "compare"],
};
const cartPersistConfig = {
    key: "cart",
    storage: storage,
};

const favoritesPersistConfig = {
    key: "favorites",
    storage: storage,
};

const comparePersistConfig = {
    key: "compare",
    storage: storage,
};

const rootReducer = combineReducers({
    cart: persistReducer(cartPersistConfig, cartSlice),
    favorites: persistReducer(favoritesPersistConfig, favoritesSlice),
    compare: persistReducer(comparePersistConfig, compareSlice),
});

const store = configureStore({
    reducer: rootReducer,
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

export { store, persistor }; */

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cartSlice from './cart/cartSlice'
import compareSlice from './compare/compareSlice'
import favoritesSlice from './favorites/favoritesSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const cartPersistConfig = {
    key: "cart",
    storage: storage,
};

const favoritesPersistConfig = {
    key: "favorites",
    storage: storage,
};

const comparePersistConfig = {
    key: "compare",
    storage: storage,
};

const rootReducer = combineReducers({
    cart: persistReducer(cartPersistConfig, cartSlice),
    favorites: persistReducer(favoritesPersistConfig, favoritesSlice),
    compare: persistReducer(comparePersistConfig, compareSlice),
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["cart", "favorites", "compare"],
};

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
