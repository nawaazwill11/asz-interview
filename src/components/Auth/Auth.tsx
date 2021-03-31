import { FunctionComponent, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getUserIdFromStorage, setUserIdToStorage, validUserId } from 'src/utils/snippets'

function Auth<Props>(Component: FunctionComponent<Props>): FunctionComponent<Props> {
    const [userId, setUserId] = useState('')
    const history = useHistory()

    useEffect(() => {
        const userIdFromStorage = getUserIdFromStorage()
        if (userIdFromStorage && validUserId(userIdFromStorage)) {
            setUserId(userIdFromStorage)
        } else {
            setUserIdToStorage('')
            history.push('/login')
        }
    }, [])

    return userId ? Component : EmptyFC
}

const EmptyFC: FunctionComponent = () => <></>

export default Auth
