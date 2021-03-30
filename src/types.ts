export type PostSchema = {
    id: string
    createdAt: string
    updatedAt: string
    title: string
    description: string
    image: string
    userId: string
}

export type PostRequestSchema = {
    userId: number
    title: string
    description: string
    imgUrl: string
}

export type AddNewPostSchema = Array<PostSchema>

export type CommentSchema = {
    id: string
    postId: string
    createdAt: string
    updatedAt: string
    commentBody: string
}
