import { FunctionComponent, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import { addPost, PostSchema, updatePost } from 'src/store/postSlice'
import api from 'src/utils/api'

import './PostForm.scss'
import { Button, Card } from 'antd'
import { getUserIdFromStorage } from 'src/utils/snippets'

const PostForm: FunctionComponent<PostSchema & { setPostFormVisible: any }> = ({
    id,
    title,
    description,
    image,
    setPostFormVisible
}) => {
    const dispatch = useAppDispatch()
    const { userId } = useAppSelector((state) => state.user) || getUserIdFromStorage()
    const imageRef = useRef<any>(null)
    const titleRef = useRef<any>(null)
    const descriptionRef = useRef<any>(null)
    const op = id ? 'update' : 'new'

    const handleUpsertClick = () => {
        const post = {
            id,
            userId,
            title: titleRef.current?.value || '',
            description: descriptionRef.current?.value || '',
            image: imageRef.current?.value || ''
        }
        // eslint-disable-next-line no-console
        console.log(post)
        if (op === 'update') {
            api.updatePost(post).then((updatedPost) => dispatch(updatePost(updatedPost)))
        } else {
            api.addPost(post).then((newPost) => dispatch(addPost(newPost)))
        }
        setPostFormVisible(false)
    }

    useEffect(() => {
        if (!userId) {
            getUserIdFromStorage()
        }
    })

    return (
        <Card>
            <form className="form">
                <div className="form-row">
                    <input
                        ref={imageRef}
                        type="text"
                        name="image"
                        className="ant-input"
                        placeholder="https://lorempixel.com/640/480/nightlife"
                        defaultValue={image}
                    />
                </div>
                <div className="form-row">
                    <input
                        ref={titleRef}
                        type="text"
                        name="title"
                        className="ant-input"
                        placeholder="Title"
                        defaultValue={title}
                    />
                </div>
                <div>
                    <textarea
                        ref={descriptionRef}
                        name="description"
                        cols={30}
                        rows={5}
                        className="ant-input"
                        defaultValue={description}
                    />
                </div>
                <div className="form-actions">
                    <Button type="text" onClick={() => handleUpsertClick()}>
                        {op === 'update' ? 'Update' : 'Save'}
                    </Button>
                    <Button
                        type="text"
                        onClick={() => {
                            setPostFormVisible(false)
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Card>
    )
}

export default PostForm
