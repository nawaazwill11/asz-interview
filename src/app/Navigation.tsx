import { Switch, Route } from 'react-router-dom'
import PostView from 'src/pages/PostView/PostView'
import { ListingPage } from '../pages/'

const Navigation = () => {
    return (
        <Switch>
            <Route exact path="/" component={ListingPage} />
            <Route exact path="/post/:id" component={PostView} />
        </Switch>
    )
}

export default Navigation
