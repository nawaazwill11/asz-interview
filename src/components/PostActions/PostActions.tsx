import { Button } from 'antd'
import { FunctionComponent } from 'react'
import DeleteButtonWithPopOver from '../DeleteButtonWithPopOver/DeleteButtonWithPopOver'

import './PostActions.scss'

export type PostActionsProps = {
    actions: {
        edit: any
        delete: any
    }
}

const PostActions: FunctionComponent<PostActionsProps> = ({ actions }) => {
    return (
        <div className="post-actions">
            <Button type="text" onClick={() => actions.edit()}>
                Edit
            </Button>
            <DeleteButtonWithPopOver onButtonClick={() => actions.delete()}>
                Delete
            </DeleteButtonWithPopOver>
        </div>
    )
}

export default PostActions
