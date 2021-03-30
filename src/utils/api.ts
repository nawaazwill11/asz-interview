import toast from 'src/lib/toast'
import { PostSchema } from 'src/pages/Listing/Listing.slice'
// import { postVar } from 'src/store/states'
import { CommentSchema } from 'src/types'
import { endpoint } from './config'
// import { useApolloState } from './hooks'

// const endpoint = (postId: string, commentId: string) => {
//     return `${API_BASE}/posts${postId && `/${postId}`}${commentId && `/${commentId}`}`
// }

type RequestSchema = {
    url: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any
}

export const networkRequest = (request: RequestSchema): Promise<Response> => {
    return fetch(request.url, {
        method: request.method,
        body: request.body && JSON.stringify(request.body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const loadPosts = (): Promise<Array<PostSchema>> => {
    return new Promise((resolve, reject) =>
        networkRequest({ url: endpoint.post.get(), method: 'GET' })
            .then((response) => response.json())
            .then((data) => {
                return resolve(data.items)
            })
            .catch((error) => reject(toast('error', 'Failed to add new post.')))
    )
}

const addPost = (post: PostSchema): Promise<PostSchema> =>
    new Promise((resolve, reject) =>
        networkRequest({
            url: endpoint.post.post(),
            method: 'POST',
            body: post
        })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error.message))
    )

const updatePost = (postBody: PostSchema): Promise<PostSchema> =>
    new Promise((resolve, reject) =>
        networkRequest({
            url: endpoint.post.put(postBody.id),
            method: 'PUT',
            body: postBody
        })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error.message))
    )

const deletePost = (postId: string): Promise<PostSchema> =>
    new Promise((resolve, reject) =>
        networkRequest({
            url: endpoint.post.delete(postId),
            method: 'DELETE'
        })
            .then((response) => response.json())
            .then((data) => resolve(data))
    )

const loadComments = (postId: string): Promise<{ count: number; comments: Array<CommentSchema> }> =>
    new Promise((resolve, reject) =>
        networkRequest({
            url: endpoint.comment.get(postId),
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => resolve({ count: data.count, comments: data.items }))
            .catch((error) => reject(error.message))
    )

const addComment = (postId: string, commentBody: string): Promise<CommentSchema> =>
    new Promise((resolve, reject) =>
        networkRequest({
            url: endpoint.comment.post(postId),
            method: 'POST',
            body: { commentBody }
        })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error.message))
    )

const deleteComment = (postId: string, commentId: string): Promise<CommentSchema> =>
    new Promise((resolve, reject) =>
        networkRequest({ url: endpoint.comment.delete(postId, commentId), method: 'DELETE' })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error.message))
    )

const api = {
    loadPosts,
    addPost,
    updatePost,
    deletePost,
    loadComments,
    addComment,
    deleteComment
}

export default api
