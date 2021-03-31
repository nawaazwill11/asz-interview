import { Button } from 'antd'
import { FunctionComponent } from 'react'
import DeleteButtonWithPopOver from '../DeleteButtonWithPopOver/DeleteButtonWithPopOver'

import './PostActions.scss'

export type PostActionsProps = {
    postId: string
    actions: {
        edit: any
        delete: any
    }
}

const PostActions: FunctionComponent<PostActionsProps> = ({ postId, actions }) => {
    return (
        <div className="post-actions">
            <Button type="text" onClick={() => actions.edit(postId)}>
                Edit
            </Button>
            <DeleteButtonWithPopOver onButtonClick={() => actions.delete(postId)}>
                Delete
            </DeleteButtonWithPopOver>
        </div>
    )
}

export default PostActions
