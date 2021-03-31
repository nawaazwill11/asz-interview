import { FunctionComponent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import { Button } from 'antd'

import { deletePost, loadPosts, PostSchema } from 'src/store/postSlice'
import api from 'src/utils/api'
import { AppLayout, Post, PostForm } from 'src/components'
import Auth from 'src/components/Auth/Auth'

import './Listing.scss'

const ListingPage: FunctionComponent = () => {
    const posts = useAppSelector((state) => state.posts)
    const [postFormVisible, setPostFormVisible] = useState(false)
    const [selectedPost, setSelectedPost] = useState<PostSchema>({
        id: '',
        userId: '',
        title: '',
        description: '',
        image: '',
        createdAt: '',
        updatedAt: ''
    })

    const dispatch = useAppDispatch()

    const handleEditAction = () => {
        window.scrollTo(0, 0)
        setPostFormVisible(true)
        setSelectedPost(selectedPost)
    }

    const handleDeleteClick = () => {
        api.deletePost(selectedPost.id).then((deletedPost) => dispatch(deletePost(deletedPost)))
    }

    useEffect(() => {
        api.loadPosts().then((data) => {
            dispatch(loadPosts(data))
        })
    }, [])

    return (
        <AppLayout>
            <Auth>
                <div className="listing">
                    <div className="new-post">
                        {!postFormVisible && (
                            <Button
                                type="text"
                                onClick={() => setPostFormVisible(!postFormVisible)}
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
                    {posts.slice(0, 10).map((post) => (
                        <Post
                            post={post}
                            actions={{ edit: handleEditAction, delete: handleDeleteClick }}
                        />
                    ))}
                </div>
            </Auth>
        </AppLayout>
    )
}

export default ListingPage
