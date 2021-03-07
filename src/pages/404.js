import React from 'react'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Content, { HTMLContent } from '../components/Content'

import _404 from '../img/404.gif'

export const _404PageTemplate = ({
  title,
  image,
  content,
  contentComponent,
  useImage,
}) => {
  const PageContent = contentComponent || Content

  return (
    <div className="not-found-container page-padding">
      <Helmet>
        <body className="menu-color-2" />
      </Helmet>
      {useImage ? (
        <PreviewCompatibleImage
          imageInfo={{
            image: image,
            alt: `Page not found`,
          }}
        />
      ) : (
        <img alt="Page not found" style={{ width: '100%' }} src={_404} />
      )}
      <div className="container not-found-page not-found-text">
        <PageContent className="container not-found-page" content={content} />
      </div>
    </div>
  )
}

_404PageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const _404Page = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <_404PageTemplate
        image={post.frontmatter.image}
        title={post.frontmatter.title}
        content={post.html}
        contentComponent={HTMLContent}
        useImage={post.frontmatter.useImage}
      />
    </Layout>
  )
}

_404Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default _404Page

export const _404PageQuery = graphql`
  query _404PageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "notFound-page" } }) {
      html
      frontmatter {
        title
        useImage
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
