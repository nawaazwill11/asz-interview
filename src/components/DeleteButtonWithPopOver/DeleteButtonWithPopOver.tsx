import { Button, Popover } from 'antd'
import { FunctionComponent, useState } from 'react'

type DeleteButtonWithPopOverProps = {
    onButtonClick: any
}

const DeleteButtonWithPopOver: FunctionComponent<DeleteButtonWithPopOverProps> = ({
    children,
    onButtonClick
}) => {
    const [visible, setVisible] = useState(false)
    const handleVisibileChange = (visible: boolean) => setVisible(visible)
    return (
        <Popover
            content={
                <div className="delete-action">
                    <Button
                        type="text"
                        danger
                        onClick={(e) => {
                            e.stopPropagation()
                            onButtonClick()
                            setVisible(false)
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        type="text"
                        onClick={(e) => {
                            e.stopPropagation()
                            setVisible(false)
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            }
            title="Confirm?"
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibileChange}
        >
            <Button type="text">{children}</Button>
        </Popover>
    )
}

export default DeleteButtonWithPopOver
