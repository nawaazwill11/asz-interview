import { FunctionComponent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import { deletePost, loadPosts, PostSchema } from 'src/store/postSlice'
import api from 'src/utils/api'
import { Post, PostForm } from 'src/components'
import Auth from 'src/components/Auth/Auth'

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
        // SCroll behavior: smooth
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
        <Auth>
            <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {!postFormVisible && (
                        <button onClick={() => setPostFormVisible(!postFormVisible)}>
                            + New Post
                        </button>
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
    )
}

export default ListingPage
