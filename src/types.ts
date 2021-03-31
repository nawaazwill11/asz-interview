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
