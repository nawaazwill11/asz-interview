import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommentSchema } from 'src/types'

const initialState: Array<{
    postId: string
    comments: Array<CommentSchema>
}> = []

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComments(
            state,
            action: PayloadAction<{ postId: string; comments: Array<CommentSchema> }>
        ) {
            const postPos = state.findIndex(({ postId }) => postId === action.payload.postId)
            if (postPos !== -1) {
                state[postPos].comments = action.payload.comments
            } else state.push(action.payload)
            return state
        },
        addComment(state, action: PayloadAction<{ postId: string; comment: CommentSchema }>) {
            const postPos = state.findIndex((post) => post.postId === action.payload.postId)
            if (state[postPos]) {
                state[postPos].comments.push(action.payload.comment)
            }
            return state
        },
        deleteComment(state, action: PayloadAction<{ postId: string; comment: CommentSchema }>) {
            const postPos = state.findIndex((post) => post.postId === action.payload.postId)
            if (postPos !== -1) {
                state[postPos].comments = state[postPos].comments.filter(
                    (comment) => comment.id !== action.payload.comment.id
                )
            }
            return state
        }
    }
})

export const { setComments, addComment, deleteComment } = commentSlice.actions

export default commentSlice.reducer
