import { Switch, Route } from 'react-router-dom'
// import { useAppSelector } from 'src/store/store'
// import { setUser } from 'src/store/userSlice'
// import { getUserIdFromStorage, validUserId } from 'src/utils/snippets'
import { Login, ListingPage, PostView } from '../pages/'
import { AuthRoute, Auth } from './Auth'

const Navigation = ({ auth }: { auth: Auth }) => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <AuthRoute exact auth={auth} path="/" component={ListingPage} />
            <AuthRoute exact auth={auth} path="/post/:id" component={PostView} />
        </Switch>
    )
}

export default Navigation
