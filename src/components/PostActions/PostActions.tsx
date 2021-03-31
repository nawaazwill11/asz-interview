import { FunctionComponent } from 'react'

export type PostActionsProps = {
    actions: {
        edit: any
        delete: any
    }
}

const PostActions: FunctionComponent<PostActionsProps> = ({ actions }) => {
    return (
        <div>
            <button onClick={() => actions.edit()}>Edit</button>
            <button onClick={() => actions.delete()}>Delete</button>
        </div>
    )
}

export default PostActions
