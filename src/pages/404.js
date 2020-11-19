import React from 'react'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'

import _404 from '../img/404.png'

const container = {
  width: '100%',
  padding: '0',
  margin: '0',
  marginBottom: '-7px',
  paddingBottom: '10em',
  backgroundColor: '#2D2C2C',
}

const textContainer = {
  maxWidth: '818px',
  position: 'relative',
}

const text = {
  color: '#F8F3F1',
  fontSize: '2.25em',
  position: 'relative',
  top: '-47px',
}

const NotFoundPage = () => (
  <Layout>
    <div style={container}>
      <Helmet>
        <body className="menu-color-2" />
      </Helmet>          
      <figure className="">
          <img alt="Page not found image" src={_404}/>
      </figure>
      <div className="container" style={textContainer}>
        <h3 style={text}>No one’s home—because they’re<br/> all hanging out over <Link className="link-underline-dk" to="/">here</Link>.</h3> 
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
