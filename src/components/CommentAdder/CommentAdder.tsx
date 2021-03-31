import { FunctionComponent, useRef } from 'react'
import { addComment } from 'src/store/commentSlice'
import { useAppDispatch } from 'src/store/store'
import api from 'src/utils/api'
import { Button } from 'antd'

import './CommentAdder.scss'

type CommentAdderProps = {
    postId: string
}

const CommentAdder: FunctionComponent<CommentAdderProps> = ({ postId }) => {
    const newCommentRef = useRef<HTMLTextAreaElement>(null)
    const dispatch = useAppDispatch()

    return (
        <div className="comment-add">
            <textarea ref={newCommentRef} name="commentbox" className="ant-input" rows={4} />
            <div className="comment-add-button">
                <Button
                    type="text"
                    onClick={() => {
                        api.addComment(postId, newCommentRef.current?.value || '').then(
                            (comment) => {
                                if (newCommentRef.current) newCommentRef.current.value = ''
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
