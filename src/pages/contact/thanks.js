import React from 'react'
import Layout from '../../components/Layout'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

const thankYouContainer = {
  marginTop: '7em',
  marginBottom: '7em',
  padding: '2rem',
}

const thankYou = {
  maxWidth: '844px',
  margin: 'auto',
}

const aboutTitle = {
  color: '#BA5930',
  fontSize: '3em',
}

const aboutText = {
  fontSize: '1.65em',
}


export default () => (
  <Layout>
    <Helmet>
      <body className="menu-color-2" />
    </Helmet>  
    <section style={thankYouContainer}>
      <div className="container is-max-widescreen">
        <div className="columns">
          <div className="column" style={thankYou}>              
          <h2 className="title" style={aboutTitle}>
            Thanks for reaching out! 
          </h2>
          <p style={aboutText}>
            We’ll be in touch within the next day or two. In the meantime,<br/>check out
            {' '}
            <span>
              <Link to="/projects" className="link-underline">
              this cool stuff
              </Link>
            </span>.
          </p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)
