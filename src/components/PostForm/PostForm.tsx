import { FunctionComponent, useRef } from 'react'
import { useAppDispatch } from 'src/app/store'
import { addPost, PostSchema, updatePost } from 'src/pages/Listing/Listing.slice'
import api from 'src/utils/api'

const PostForm: FunctionComponent<
    PostSchema & { setSelectedPost: any; setPostFormVisible: any }
> = ({ id, userId, title, description, image, setSelectedPost, setPostFormVisible }) => {
    // const post = {
    //     id,
    //     userId,
    //     title,
    //     description,
    //     image
    // }
    const dispatch = useAppDispatch()
    const imageRef = useRef<HTMLInputElement>(null)
    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const op = id ? 'update' : 'new'

    return (
        <form>
            <div>
                <input
                    ref={imageRef}
                    type="text"
                    name="image"
                    placeholder="https://lorempixel.com/640/480/nightlife"
                    defaultValue={image}
                />
            </div>
            <div>
                <input
                    ref={titleRef}
                    type="text"
                    name="title"
                    placeholder="Title"
                    defaultValue={title}
                />
            </div>
            <div>
                <textarea
                    ref={descriptionRef}
                    name="description"
                    cols={30}
                    rows={10}
                    defaultValue={description}
                />
            </div>
            <div>
                <button
                    onClick={() => {
                        const post = {
                            id,
                            title: titleRef.current?.value || '',
                            description: descriptionRef.current?.value || '',
                            image: imageRef.current?.value || ''
                        }
                        if (op === 'update') {
                            api.updatePost(post).then((updatedPost) =>
                                dispatch(updatePost(updatedPost))
                            )
                        } else {
                            api.addPost(post).then((newPost) => dispatch(addPost(newPost)))
                        }
                        setPostFormVisible(false)
                    }}
                >
                    {op === 'update' ? 'Update' : 'Save'}
                </button>
                <button
                    onClick={() => {
                        setPostFormVisible(false)
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default PostForm
