import { FunctionComponent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'src/store/store'
import { PostSchema } from 'src/store/postSlice'
import api from 'src/utils/api'
import { getDate } from 'src/utils/snippets'
import PostActions from '../PostActions/PostActions'
import { useDispatch } from 'react-redux'
import { setComments } from 'src/store/commentSlice'

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

    return (
        <div style={{ boxShadow: '0px 0px 0px 1px black' }}>
            <div style={{ width: '100%' }}>
                <div style={{ width: '100%', height: '100px', backgroundImage: image }} />
                <div>
                    <strong>{title}</strong>
                </div>
                <div>
                    Created at <span>{getDate(createdAt).toUTCString()}</span>
                </div>
                <div>
                    Last Updated at <span>{getDate(updatedAt).toUTCString()}</span>
                </div>
                <div>
                    <p>{description}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <Link
                            to={{
                                pathname: `/post/${id}`,
                                state: post
                            }}
                        >
                            <strong>{commentCount} comments</strong>
                        </Link>
                    </div>
                    {postUserId === currentUserId && <PostActions actions={actions} />}
                </div>
            </div>
        </div>
    )
}

export default Post
