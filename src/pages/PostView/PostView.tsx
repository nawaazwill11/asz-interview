import { FunctionComponent, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import { AppLayout, CommentAdder, CommentList, Post, PostForm } from 'src/components'
import { PostSchema } from 'src/store/postSlice'
import api from 'src/utils/api'
import { deletePost } from 'src/store/postSlice'
import { getUserIdFromStorage } from 'src/utils/snippets'
import { setUser } from 'src/store/userSlice'
// import Auth from 'src/components/Auth/Auth'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

const PostView: FunctionComponent<PostSchema> = () => {
    // check state of location first to get post and comment value
    const { id } = useParams<{ id: string }>()
    const { userId } = useAppSelector((state) => state.user)
    const postFromState = useAppSelector(
        (state) => state.posts && state.posts.find((_post) => _post.id === id)
    )

    const [post, setPost] = useState<PostSchema>({
        id,
        userId,
        title: '',
        description: '',
        image: '',
        createdAt: '',
        updatedAt: ''
    })

    const [postFormvisible, setPostFormVisible] = useState(false)
    const dispatch = useAppDispatch()
    const history = useHistory()

    useEffect(() => {
        if (postFromState) setPost(postFromState as PostSchema)
        else {
            dispatch(setUser(getUserIdFromStorage()))
            api.loadPosts().then((posts) => {
                const postFromServer = posts.find(({ id: postId }) => postId === id)
                if (postFromServer && postFromServer.id) {
                    setPost(postFromServer as PostSchema)
                }
            })
        }
    }, [])

    const handleEditClick = () => setPostFormVisible(true)

    const handleDeleteClick = (postId: string) =>
        api.deletePost(postId).then((deletedPost) => {
            dispatch(deletePost(deletedPost))
            history.push('/')
        })

    return (
        <AppLayout>
            <div>
                <div>
                    <Link to="/">
                        <ArrowLeftOutlined />
                        <span style={{ marginLeft: '0.25rem' }}>Back</span>
                    </Link>
                </div>
                {postFormvisible ? (
                    <PostForm {...post} setPostFormVisible={setPostFormVisible} />
                ) : (
                    ''
                )}
                <Post post={post} actions={{ edit: handleEditClick, delete: handleDeleteClick }} />
                <CommentAdder postId={id} />
                <CommentList postId={id} />
            </div>
        </AppLayout>
    )
}

export default PostView
