import { FunctionComponent } from 'react'
import { useAuth } from './Auth'
import Navigation from './Navigation'

const App: FunctionComponent = () => {
    const auth = useAuth()
    return <Navigation auth={auth} />
}

export default App
