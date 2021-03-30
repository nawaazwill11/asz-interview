import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'src/app/store'
import { CommentSchema, PostSchema } from 'src/types'
import api from 'src/utils/api'

const PostView: FunctionComponent<PostSchema> = () => {
    // check state of location first to get post and comment value
    const { id } = useParams<{ id: string }>()
    const post = useAppSelector((state) => state.posts.find((_post) => _post.id === id))
    const [comments, setComments] = useState<Array<CommentSchema>>([])

    useEffect(() => {
        api.loadComments(id).then(({ comments }) => setComments(comments))
    }, [])

    const newCommentRef = useRef<HTMLTextAreaElement>(null)

    return (
        <div>
            <div style={{ boxShadow: '0px 0px 0px 1px black' }}>
                <div style={{ width: '100%' }}>
                    <div style={{ width: '100%', height: '100px', backgroundImage: post?.image }} />
                    <div>
                        <strong>{post?.title}</strong>
                    </div>
                    <div>
                        Created at <span>{post?.createdAt}</span>
                    </div>
                    <div>
                        Last Updated at <span>{post?.updatedAt}</span>
                    </div>
                    <div>
                        <p>{post?.description}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <Link
                                to={{
                                    pathname: `/post/${id}`,
                                    state: post
                                }}
                            >
                                <strong>{comments.length} comments</strong>
                            </Link>
                        </div>
                        <div>
                            <button
                            // onClick={() => {
                            //     setPostFormVisible(true)
                            //     setSelectedPost({
                            //         id,
                            //         userId,
                            //         title,
                            //         description,
                            //         image,
                            //         createdAt,
                            //         updatedAt
                            //     })
                            // }}
                            >
                                Edit
                            </button>
                            <button
                            // onClick={() => {
                            //     api.deletePost(id).then((deletedPost) =>
                            //         dispatch(deletePost(deletedPost))
                            //     )
                            // }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <textarea
                    ref={newCommentRef}
                    name="commentbox"
                    rows={4}
                    style={{ width: '100%' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={() => {
                            api.addComment(id, newCommentRef.current?.value || '').then(
                                (comment) => {
                                    setComments([...comments, comment])
                                }
                            )
                        }}
                    >
                        Comment
                    </button>
                </div>
            </div>
            <div>
                {comments.map((comment) => (
                    <div>
                        <p>{comment.commentBody}</p>
                        <button
                            onClick={() => {
                                api.deleteComment(id, comment.id).then((deletedComment) => {
                                    setComments(
                                        comments.filter(({ id }) => id !== deletedComment.id)
                                    )
                                })
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PostView
