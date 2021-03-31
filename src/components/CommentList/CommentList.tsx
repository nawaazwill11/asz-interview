import { FunctionComponent, useEffect, useState } from 'react'
import { deleteComment, setComments } from 'src/store/commentSlice'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import { CommentSchema } from 'src/types'
import api from 'src/utils/api'

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
        <div>
            {comments.map((comment) => (
                <div>
                    <p>{comment.commentBody}</p>
                    <button onClick={() => handleDeleteClick(comment.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default CommentList
