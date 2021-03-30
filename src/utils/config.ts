export const API_BASE = 'https://60334e6aa223790017ad019e.mockapi.io/api/v1'

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
