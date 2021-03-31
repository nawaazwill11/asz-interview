import { Redirect, Route } from 'react-router'
import { useAppDispatch, useAppSelector } from 'src/store/store'
import { setUser } from 'src/store/userSlice'
import { getUserIdFromStorage } from 'src/utils/snippets'

export type Auth = { userId: string } | false

type AuthRouteArgs = {
    component: any
    path: string
    exact: boolean
    auth: Auth
}

export const AuthRoute = ({ component: Component, auth, ...rest }: AuthRouteArgs) => {
    return (
        <Route
            render={({ location }) =>
                auth && auth.userId ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
            {...rest}
        />
    )
}

export function useAuth() {
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
