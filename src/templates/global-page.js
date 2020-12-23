import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

const parentContainer = {
  height: '400px',
}

const container = {
  color: 'black',
  fontSize: '2em',
}

export const GlobalPageTemplate = ({
  title,
  footer,
  nav,
}) => {
  return (   
    <div className="container is-max-widescreen" style={parentContainer}>
        {footer && footer.menu.map((item) => (
          <div style={container}>
            <p>{item.text}</p>
            <p>{item.path}</p>
          </div>
          )
        )}
    </div>
)}

GlobalPageTemplate.propTypes = {
  title: PropTypes.string,
  footer: PropTypes.object,
  nav: PropTypes.object,
}

const GlobalPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <GlobalPageTemplate
        title={frontmatter.title}
        footer={frontmatter.footer}
        nav={frontmatter.nav}
      />
    </Layout>
  )
}

GlobalPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default GlobalPage

export const pageQuery = graphql`
  query GlobalPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "global-page" } }) {
      frontmatter {
        title
        footer {
            menu {
                text
                local
                path
            }
            copywrite
            menu {
                text
                local
                path
            }
        }
        nav {
            text
            local
            path
        }  
      }
    }
  }
`
