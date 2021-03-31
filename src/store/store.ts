import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import userSlice from './userSlice'
import postSlice from './postSlice'
import commentSlice from './commentSlice'

const store = configureStore({
    reducer: {
        user: userSlice,
        posts: postSlice,
        comments: commentSlice
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
