import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getDate } from 'src/utils/snippets'

export type PostSchema = {
    id: string
    title: string
    description: string
    image: string
    userId?: string
    createdAt?: string
    updatedAt?: string
}

export type CommentSchema = {
    id: string
    postId: string
    createdAt: string
    updatedAt: string
    commentBody: string
}

const initialState: Array<PostSchema> = []

const postSlice = createSlice({
    name: 'Post',
    initialState,
    reducers: {
        addPost(state, action: PayloadAction<PostSchema>) {
            state = [action.payload, ...state]
            return state
        },
        loadPosts(state, action: PayloadAction<Array<PostSchema>>) {
            state = action.payload.sort(
                (a, b) =>
                    (b.createdAt ? ((getDate(b.createdAt) as unknown) as number) : 0) -
                    (a.createdAt ? ((getDate(a.createdAt) as unknown) as number) : 0)
            )
            return state
        },
        updatePost(state, action: PayloadAction<PostSchema>) {
            const postToUpdatePos = state.findIndex((post) => post.id === action.payload.id)
            state[postToUpdatePos] = action.payload
            return state
        },
        deletePost(state, action: PayloadAction<PostSchema>) {
            const postToDeletePos = state.findIndex((post) => post.id === action.payload.id)
            state.splice(postToDeletePos, 1)
            return state
        }
    }
})

export const { addPost, loadPosts, updatePost, deletePost } = postSlice.actions

export default postSlice.reducer
