import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cart/cartSlice'
import compareSlice from './compare/compareSlice'
import favoritesSlice from './favorites/favoritesSlice'



export const store = configureStore({
    reducer: {
        cart: cartSlice,
        favorites: favoritesSlice,
        compare: compareSlice

    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

