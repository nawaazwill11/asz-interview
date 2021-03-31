import { Switch, Route, Redirect } from 'react-router-dom'
// import { useAppSelector } from 'src/store/store'
// import { setUser } from 'src/store/userSlice'
// import { getUserIdFromStorage, validUserId } from 'src/utils/snippets'
import { Login, ListingPage, PostView } from '../pages/'

type Auth = { userId: string } | false

const Navigation = ({ auth }: { auth: Auth }) => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <AuthRoute exact auth={auth} path="/" component={ListingPage} />
            <AuthRoute exact auth={auth} path="/post/:id" component={PostView} />
        </Switch>
    )
}

type AuthRouteArgs = {
    component: any
    path: string
    exact: boolean
    auth: Auth
}

const AuthRoute = ({ component: Component, auth, ...rest }: AuthRouteArgs) => {
    // eslint-disable-next-line no-console
    console.log(auth)
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

export default Navigation
