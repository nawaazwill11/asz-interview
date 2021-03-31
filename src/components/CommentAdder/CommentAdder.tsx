import { FunctionComponent, useRef } from 'react'
import { addComment } from 'src/store/commentSlice'
import { useAppDispatch } from 'src/store/store'
import api from 'src/utils/api'

type CommentAdderProps = {
    postId: string
}

const CommentAdder: FunctionComponent<CommentAdderProps> = ({ postId }) => {
    const newCommentRef = useRef<HTMLTextAreaElement>(null)
    const dispatch = useAppDispatch()
    return (
        <div>
            <textarea ref={newCommentRef} name="commentbox" rows={4} style={{ width: '100%' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    onClick={() => {
                        api.addComment(postId, newCommentRef.current?.value || '').then(
                            (comment) => {
                                dispatch(addComment({ postId, comment }))
                            }
                        )
                    }}
                >
                    Comment
                </button>
            </div>
        </div>
    )
}

export default CommentAdder
