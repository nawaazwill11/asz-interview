import { FunctionComponent } from 'react'
import { Layout } from 'antd'

import './Layout.scss'
import { Link } from 'react-router-dom'

const AppLayout: FunctionComponent = ({ children }) => {
    const { Header, Footer, Content } = Layout
    return (
        <Layout>
            <Header>
                <h1 style={{ color: 'white' }}>ASZ Interview Assessment</h1>
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
