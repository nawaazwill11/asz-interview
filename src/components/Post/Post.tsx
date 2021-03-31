import { FunctionComponent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
    const { id, userId: postUserId, title, description, image, createdAt, updatedAt } = post
    const [commentCount, setCommentCount] = useState(0)
    const { userId: currentUserId } = useAppSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        // api.loadComments(id).then(({ count }) => setComments(count))
        api.loadComments(id).then(({ count, comments }) => {
            dispatch(setComments({ postId: id, comments }))
            setCommentCount(count)
        })
    }, [])

    const { Title } = Typography

    return (
        <div className="post">
            <Card>
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
                    <p>{description}</p>
                </div>
                <div className="post-interaction">
                    <div>
                        <Link
                            to={{
                                pathname: `/post/${id}`,
                                state: post
                            }}
                        >
                            <strong>{commentCount || 0} comments</strong>
                        </Link>
                    </div>
                    {postUserId === currentUserId && <PostActions actions={actions} />}
                </div>
            </Card>
        </div>
    )
}

export default Post
