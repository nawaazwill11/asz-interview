import { FunctionComponent, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAppSelector } from 'src/store/store'
import { PostSchema } from 'src/store/postSlice'
import api from 'src/utils/api'
import { getFormattedDate } from 'src/utils/snippets'
import PostActions from '../PostActions/PostActions'
import { useDispatch } from 'react-redux'
import { setComments } from 'src/store/commentSlice'

import './Post.scss'
import { Card, Typography } from 'antd'

type PostProps = {
    post: PostSchema
    actions: {
        edit: any
        delete: any
    }
}

const Post: FunctionComponent<PostProps> = ({ post, actions }) => {
    const [loading, setLoading] = useState(true)
    const { id, userId: postUserId, title, description, image, createdAt, updatedAt } = post
    const [commentCount, setCommentCount] = useState(0)
    const commentsFromStore = useAppSelector((state) =>
        state.comments.find((comment) => comment.postId === id)
    )
    const { userId: currentUserId } = useAppSelector((state) => state.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const postPath = `/post/${id}`

    useEffect(() => {
        if (commentsFromStore) {
            setCommentCount(commentsFromStore.comments.length)
            setLoading(false)
        } else {
            api.loadComments(id).then(({ count, comments }) => {
                dispatch(setComments({ postId: id, comments }))
                setCommentCount(count)
                setLoading(false)
            })
        }
        // api.loadComments(id).then(({ count }) => setComments(count))
    }, [commentsFromStore?.comments])

    const { Title } = Typography

    return (
        <div className="post">
            <Card loading={loading} hoverable onClick={() => history.push(postPath)}>
                <div className="image" style={{ backgroundImage: `url(${image})` }} />
                <div>
                    <Title level={4}>{title}</Title>
                </div>
                <div>
                    <p>
                        Created: <span>{getFormattedDate(createdAt)}</span>
                        <br />
                        Last Updated: <span>{getFormattedDate(updatedAt)}</span>
                    </p>
                </div>
                <div>
                    <p style={{ fontSize: '1rem' }}>{description}</p>
                </div>
                <div className="post-interaction">
                    <div>
                        <Link
                            to={{
                                pathname: postPath,
                                state: post
                            }}
                        >
                            <strong>{commentCount || 0} comments</strong>
                        </Link>
                    </div>
                    {postUserId === currentUserId && (
                        <PostActions postId={post.id} actions={actions} />
                    )}
                </div>
            </Card>
        </div>
    )
}

export default Post
