import React from 'react'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Content, { HTMLContent } from '../components/Content'

import _404 from '../img/404.gif'

export const NotFoundPageTemplate = ({ title, image, content, contentComponent, useImage }) => {
  const PageContent = contentComponent || Content
  console.log(image)
  return (
    <div className="notfound-container" >
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
      <div className="container not-found-page notFound-text">
        <PageContent className="container not-found-page" content={content} />
      </div>
    </div>
  )
} 

NotFoundPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,

}

const NotFoundPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <NotFoundPageTemplate
        image={post.frontmatter.image}
        title={post.frontmatter.title}
        content={post.html}
        contentComponent={HTMLContent}
        useImage={post.frontmatter.useImage}
      />
    </Layout>
  )
}
  
NotFoundPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default NotFoundPage

export const notFoundPageQuery = graphql`
  query NotFoundPageTemplate {
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
