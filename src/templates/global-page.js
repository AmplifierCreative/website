import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'



export const GlobalPageTemplate = ({
  title,
  menu,
  copywrite,
  social,
}) => {
  return (   
    <div className="container is-max-widescreen">
        {title}
    </div>
)}

GlobalPageTemplate.propTypes = {
  title: PropTypes.string,
  menu: PropTypes.object,
  copywrite: PropTypes.string,
  social: PropTypes.object,
}

const GlobalPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <GlobalPageTemplate
        title={frontmatter.title}
        menu={frontmatter.menu}
        copywrite={frontmatter.copywrite}
        social={frontmatter.social}
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
        menu {
            item {
                local
                text
                path
            }
        }
        copywrite
        social {
            item {
                local
                text
                path
            }
        }
      }
    }
  }
`
