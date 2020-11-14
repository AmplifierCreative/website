import React from 'react'
import Layout from '../../components/Layout'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

const thankYouContainer = {
  marginTop: "7em",
  marginBottom: "7em",
}

const thankYou = {
  maxWidth: "844px",
  margin: "auto",
}

const aboutTitle = {
  color: "#BA5930",
  fontSize: '3em',
}

const aboutText = {
  fontSize: '1.65em',
}

const linkWrapper = {
  backgroundColor: "#FAB395",
  opacity: ".5",
}

const linkHighlight = {
  textDecoration: "none",
  color: "#2D2C2C",
}

export default () => (
  <Layout>
    <Helmet>
      <body className="menu-color-2" />
    </Helmet>  
    <section className="section" style={thankYouContainer}>
      <div className="container is-max-widescreen">
        <div className="columns">
          <div className="column" style={thankYou}>              
          <h2 className="title" style={aboutTitle}>
            Thanks for reaching out! 
          </h2>
          <p style={aboutText}>
            We’ll be in touch within the next day or two. In the meantime,<br/>check out
            {' '}
            <span style={linkWrapper}>
              <Link to="/projects" style={linkHighlight}>
              this cool stuff.
              </Link>
            </span>
          </p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)
