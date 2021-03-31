import { Switch, Route } from 'react-router-dom'
import { Login, ListingPage, PostView } from '../pages/'

const Navigation = () => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={ListingPage} />
            <Route exact path="/post/:id" component={PostView} />
        </Switch>
    )
}

export default Navigation
