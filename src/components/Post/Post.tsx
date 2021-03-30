import { FunctionComponent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from 'src/app/store'
import { deletePost, PostSchema } from 'src/pages/Listing/Listing.slice'
import api from 'src/utils/api'
import { getDate } from 'src/utils/snippets'

const Post: FunctionComponent<
    PostSchema & {
        setSelectedPost: any
        setPostFormVisible: any
    }
> = ({
    id,
    userId,
    title,
    description,
    image,
    createdAt,
    updatedAt,
    setPostFormVisible,
    setSelectedPost
}) => {
    const post = { id, userId, title, description, image, createdAt, updatedAt }
    const [comments, setComments] = useState(0)
    const dispatch = useAppDispatch()

    useEffect(() => {
        api.loadComments(id).then(({ count }) => setComments(count))
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
                            <strong>{comments} comments</strong>
                        </Link>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                setPostFormVisible(true)
                                setSelectedPost({
                                    id,
                                    userId,
                                    title,
                                    description,
                                    image,
                                    createdAt,
                                    updatedAt
                                })
                            }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                api.deletePost(id).then((deletedPost) =>
                                    dispatch(deletePost(deletedPost))
                                )
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
