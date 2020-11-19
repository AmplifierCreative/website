import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { Helmet } from 'react-helmet'

export const PrivacyPageTemplate = ({ title, mtime, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <Helmet>
        <body className="menu-color-2" />
      </Helmet>  
      <div className="container is-text">
        <div className="columns">
          <div className="column">
            <div className="section">
              <h1 className="title privacy-title">
                {title}
              </h1>
              <p>{mtime}</p>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

PrivacyPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const PrivacyPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <PrivacyPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

PrivacyPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PrivacyPage

export const privacyPageQuery = graphql`
  query PrivacyPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
      parent {
        ... on File {
          mtime
        }
      }
    }
  }
`
