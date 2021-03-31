import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    userId: '1'
}

const userSlice = createSlice({
    name: 'USER',
    initialState,
    reducers: {
        getUser(state) {
            return state
        },
        setUser(state, action: PayloadAction<string>) {
            state.userId = action.payload
            return state
        }
    }
})

export const { getUser, setUser } = userSlice.actions

export default userSlice.reducer
