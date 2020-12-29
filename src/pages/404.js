import React from 'react'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Content, { HTMLContent } from '../components/Content'

import _404 from '../img/404.gif'

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
  padding: '2rem',
}

const text = {
  color: '#F8F3F1',
  fontSize: '2.25em',
  position: 'relative',
}

export const _404PageTemplate = ({ title, image, content, contentComponent, useImage }) => {
  const PageContent = contentComponent || Content

  return (
    <div style={container}>
      <Helmet>
          <body className="menu-color-2" />
      </Helmet>
      { useImage ? 
        <PreviewCompatibleImage
          imageInfo={{
            image: image,
            alt: `Page not found image`,
          }}
      /> : 
        <img alt="Page not found image" src={_404} />}
      <div className="container not-found-page" style={textContainer}>
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
