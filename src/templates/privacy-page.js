import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import SEO from '../components/Seo'

export const PrivacyPageTemplate = ({ title, seo, mtime, content, contentComponent }) => {
  const PageContent = contentComponent || Content
  return (
    <section className="section section--gradient page-padding">
      <Helmet>
        <body className="menu-color-2" />
      </Helmet>
      <SEO 
        title={seo.title}
        description={seo.description}
        image={seo.image.name}
      />
      <div className="container is-text">
        <div className="columns">
          <div className="column">
            <div className="section contracts">
              <h1 className="">
                {title}
              </h1>
              <p className="date-modified">Last Updated: {mtime}</p>
              <PageContent className="content contracts" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

PrivacyPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  seo: PropTypes.object,
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
        seo={post.frontmatter.seo}
        mtime={post.parent.mtime}
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
        seo {
          title
          description
          image {
            name
          }
        }
      }
      parent {
        ... on File {
          mtime(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`

