import { API_BASE } from 'src/app/config'
import { PostSchema } from 'src/store/postSlice'
import { CommentSchema } from 'src/types'

export const endpoint = {
    post: {
        get: (): string => `${API_BASE}/posts`,
        post: (): string => `${API_BASE}/posts`,
        put: (postId: string): string => `${API_BASE}/posts/${postId}`,
        delete: (postId: string): string => `${API_BASE}/posts/${postId}`
    },
    comment: {
        get: (postId: string): string => `${API_BASE}/posts/${postId}/comments`,
        post: (postId: string): string => `${API_BASE}/posts/${postId}/comments`,
        put: (postId: string, commentId: string): string =>
            `${API_BASE}/posts/${postId}/comments/${commentId}`,
        delete: (postId: string, commentId: string): string =>
            `${API_BASE}/posts/${postId}/comments/${commentId}`
    }
}

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
            .catch((error) => reject(error.message))
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
            .then((data) => {
                return resolve({ count: data.count, comments: data.items })
            })
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
