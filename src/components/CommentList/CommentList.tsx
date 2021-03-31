import { Button } from 'antd'
import { FunctionComponent, useEffect, useState } from 'react'
import { deleteComment, setComments } from 'src/store/commentSlice'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import api from 'src/utils/api'
import { getFormattedDate } from 'src/utils/snippets'

import './CommentList.scss'

export type CommentSchema = {
    id: string
    postId: string
    createdAt: string
    updatedAt: string
    commentBody: string
}

type CommentListProps = {
    postId: string
}

const CommentList: FunctionComponent<CommentListProps> = ({ postId }) => {
    const [comments, setCommentsLocally] = useState<Array<CommentSchema>>([])
    const commentsFromState = useAppSelector(
        (state) => state.comments && state.comments.find((post) => post.postId === postId)
    )
    const dispatch = useAppDispatch()
    // create comments state in reduce and set comments during listing page load
    useEffect(() => {
        if (commentsFromState) setCommentsLocally(commentsFromState.comments)
        else {
            api.loadComments(postId).then(({ comments }) =>
                dispatch(setComments({ postId, comments }))
            )
        }
    }, [commentsFromState])

    const handleDeleteClick = (commentId: string) =>
        api.deleteComment(postId, commentId).then((comment) => {
            dispatch(deleteComment({ postId, comment }))
        })

    return (
        <div className="comments">
            <strong>Comments ({comments.length})</strong>
            {comments.map((comment) => (
                <div className="comment">
                    <p>{comment.commentBody}</p>
                    <div className="comment-bottom">
                        <Button type="text" onClick={() => handleDeleteClick(comment.id)}>
                            Delete
                        </Button>
                        <span>Created: {getFormattedDate(comment.createdAt)}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CommentList
