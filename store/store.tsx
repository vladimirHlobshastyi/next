import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cartSlice from './cart/cartSlice'
import compareSlice from './compare/compareSlice'
import favoritesSlice from './favorites/favoritesSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    cart: persistReducer(persistConfig, cartSlice),
    favorites: persistReducer(persistConfig, favoritesSlice),
    compare: persistReducer(persistConfig, compareSlice),
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

export { store, persistor };