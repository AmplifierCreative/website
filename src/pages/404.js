import React from 'react'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'

const NotFoundPage = () => (
  <Layout>
    <div>
      <Helmet>
        <body className="menu-color-2" />
      </Helmet>          
      <div>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
