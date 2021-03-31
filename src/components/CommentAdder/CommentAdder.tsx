import { FunctionComponent, useRef } from 'react'
import { addComment } from 'src/store/commentSlice'
import { useAppDispatch } from 'src/store/store'
import api from 'src/utils/api'
import { Button, Input } from 'antd'

import './CommentAdder.scss'

type CommentAdderProps = {
    postId: string
}

const CommentAdder: FunctionComponent<CommentAdderProps> = ({ postId }) => {
    const newCommentRef = useRef<HTMLTextAreaElement>(null)
    const dispatch = useAppDispatch()

    return (
        <div className="comment-add">
            <Input.TextArea ref={newCommentRef} name="commentbox" rows={4} />
            <div className="comment-add-button">
                <Button
                    type="text"
                    onClick={() => {
                        api.addComment(postId, newCommentRef.current?.value || '').then(
                            (comment) => {
                                dispatch(addComment({ postId, comment }))
                            }
                        )
                    }}
                >
                    Comment
                </Button>
            </div>
        </div>
    )
}

export default CommentAdder
