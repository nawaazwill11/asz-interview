import { FunctionComponent } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import { setUser } from 'src/store/userSlice'
import { getUserIdFromStorage } from 'src/utils/snippets'
import Navigation from './Navigation'

const App: FunctionComponent = () => {
    const auth = useAuth()
    return <Navigation auth={auth} />
}

function useAuth() {
    const dispatch = useAppDispatch()
    const userFromState = useAppSelector((state) => state.user)
    if (userFromState.userId) return userFromState

    const userFromStorage = getUserIdFromStorage()
    if (userFromStorage) {
        dispatch(setUser(userFromStorage))
        return { userId: userFromStorage }
    }

    return false
}

export default App
