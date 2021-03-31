import { Button, Card } from 'antd'
import { FunctionComponent, useEffect, useRef } from 'react'
import { useHistory } from 'react-router'
import { useAppDispatch } from 'src/store/store'
import { setUser } from 'src/store/userSlice'
import { getUserIdFromStorage, setUserIdToStorage, validUserId } from 'src/utils/snippets'

const Login: FunctionComponent = () => {
    const userRef = useRef<HTMLInputElement>(null)
    const errorRef = useRef<HTMLSpanElement>(null)
    const dispatch = useAppDispatch()
    const history = useHistory()

    const handleInputChange = () => {
        if (errorRef.current) {
            errorRef.current.innerText = ''
        }
    }
    const handleLoginClick = () => {
        if (userRef.current) {
            const userId = userRef.current.value
            if (validUserId(userId)) {
                dispatch(setUser(userId))
                setUserIdToStorage(userId)
                history.push('/')
            } else {
                if (errorRef.current) {
                    errorRef.current.innerText = 'Numbers only'
                }
            }
        }
    }

    useEffect(() => {
        if (validUserId(getUserIdFromStorage())) history.push('/')
    })

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div className="login-form">
                <Card hoverable>
                    <div className="user-id">
                        <input
                            ref={userRef}
                            type="text"
                            placeholder="Enter user id"
                            style={{ width: '100%' }}
                            onChange={() => handleInputChange()}
                            className="ant-input"
                        />
                    </div>
                    <div className="error">
                        <span ref={errorRef} />
                    </div>
                    <Button
                        type="primary"
                        className="login-button"
                        onClick={() => handleLoginClick()}
                    >
                        Login
                    </Button>
                </Card>
            </div>
        </div>
    )
}

export default Login
