import { FunctionComponent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/app/store'
import { loadPosts, PostSchema } from './Listing.slice'
import api from '../../utils/api'
import { Post, PostForm } from 'src/components'

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

    useEffect(() => {
        api.loadPosts().then((data) => {
            dispatch(loadPosts(data))
        })
    }, [])

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {!postFormVisible && (
                    <button onClick={() => setPostFormVisible(!postFormVisible)}>+ New Post</button>
                )}
            </div>
            {postFormVisible ? (
                <PostForm
                    {...selectedPost}
                    setSelectedPost={setSelectedPost}
                    setPostFormVisible={setPostFormVisible}
                />
            ) : (
                ''
            )}
            {posts.slice(0, 10).map((post) => (
                <Post
                    {...post}
                    setSelectedPost={setSelectedPost}
                    setPostFormVisible={setPostFormVisible}
                />
            ))}
        </div>
    )
}

export default ListingPage
