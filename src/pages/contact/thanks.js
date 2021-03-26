import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Content, { HTMLContent } from '../../components/Content'
import Layout from '../../components/Layout'
import { Helmet } from 'react-helmet'

const ThankYouPageTemplate = ({
  heading,
  content,
  contentComponent,
}) => {

  const PostContent = contentComponent || Content

  return (
  <React.Fragment>
    <Helmet>
      <body className="menu-color-2" />
    </Helmet>  
    <main className="page-padding thankyou-container">
      <div className="container is-max-widescreen">
        <div className="columns">
          <div className="column thankyou">              
          <h2 className="title thankyou-about-title">
            {heading}
          </h2>
          <div className="thankyou-about-text">
            <PostContent content={content} />
          </div>
          </div>
        </div>
      </div>
    </main>
  </React.Fragment>
)}

ThankYouPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
}

const ThankYouPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

return (
  <Layout>
    <ThankYouPageTemplate
      heading={frontmatter.thanks.heading}
      contentComponent={HTMLContent}
      content={html}
    />
  </Layout>
  )
}

ThankYouPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.object,
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ThankYouPage

export const pageQuery = graphql`
  query ThankYouPage {
    markdownRemark (frontmatter: { templateKey: { eq: "contact-page" } }) {
      html
      frontmatter {
        thanks {
          heading
        }
      }
    }
  }
`
