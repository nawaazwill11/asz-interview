import { FunctionComponent } from 'react'
import { Button, Layout } from 'antd'

import './Layout.scss'
import { Link, useHistory } from 'react-router-dom'
import { useAppDispatch } from 'src/store/store'
import { setUser } from 'src/store/userSlice'
import { setUserIdToStorage } from 'src/utils/snippets'

const AppLayout: FunctionComponent = ({ children }) => {
    const { Header, Footer, Content } = Layout
    const dispatch = useAppDispatch()
    const history = useHistory()

    const handleLogoutClick = () => {
        dispatch(setUser(''))
        setUserIdToStorage('')
        history.push('/login')
    }
    return (
        <Layout>
            <Header>
                <div className="content">
                    <h1 style={{ color: 'white' }}>ASZ Interview Assessment</h1>
                    <Button onClick={() => handleLogoutClick()}>Logout</Button>
                </div>
            </Header>
            <Content>
                <div className="container">{children}</div>
            </Content>
            <Footer>
                <p>
                    <Link to="https://nawaaz.dev" style={{ textAlign: 'center' }}>
                        Nawaaz K.
                    </Link>
                </p>
            </Footer>
        </Layout>
    )
}

export default AppLayout
