import { FunctionComponent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import { Button } from 'antd'

import { deletePost, loadPosts, PostSchema } from 'src/store/postSlice'
import api from 'src/utils/api'
import { AppLayout, Post, PostForm } from 'src/components'

import './Listing.scss'
import { POST_CAP } from 'src/app/config'

const defaultPost = {
    id: '',
    userId: '',
    title: '',
    description: '',
    image: '',
    createdAt: '',
    updatedAt: ''
}

const ListingPage: FunctionComponent = () => {
    const posts = useAppSelector((state) => {
        // eslint-disable-next-line no-console
        console.log(state)
        return state.posts
    })
    const [postFormVisible, setPostFormVisible] = useState(false)
    const [selectedPost, setSelectedPost] = useState<PostSchema>(defaultPost)

    const dispatch = useAppDispatch()

    const handleEditAction = (postId: string) => {
        window.scrollTo(0, 0)
        setPostFormVisible(true)
        const _post = posts.find((post) => post.id === postId)
        if (_post) setSelectedPost(_post)
    }

    const handleDeleteClick = (postId: string) => {
        api.deletePost(postId).then((deletedPost) => dispatch(deletePost(deletedPost)))
    }

    useEffect(() => {
        api.loadPosts().then((data) => {
            dispatch(loadPosts(data))
        })
    }, [])

    return (
        <AppLayout>
            <div className="listing">
                <div className="new-post">
                    {!postFormVisible && (
                        <Button
                            type="text"
                            onClick={() => {
                                setSelectedPost(defaultPost)
                                setPostFormVisible(!postFormVisible)
                            }}
                        >
                            + New Post
                        </Button>
                    )}
                </div>
                {postFormVisible ? (
                    <PostForm {...selectedPost} setPostFormVisible={setPostFormVisible} />
                ) : (
                    ''
                )}
                {posts.slice(0, POST_CAP).map((post) => (
                    <Post
                        key={post.id}
                        post={post}
                        actions={{ edit: handleEditAction, delete: handleDeleteClick }}
                    />
                ))}
            </div>
        </AppLayout>
    )
}

export default ListingPage
