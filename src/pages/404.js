import React from 'react'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Content, { HTMLContent } from '../components/Content'

export const _404PageTemplate = ({
  title,
  image,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content

  return (
    <div className="not-found-container page-padding">
      <Helmet>
        <body className="menu-color-2" />
      </Helmet>
      {!!image && !!image.childImageSharp 
        ? <figure className="not-found-image">
            <PreviewCompatibleImage
              imageInfo={{
                image: image,
                alt: `Page not found`
                }}
            />
          </figure>
        : <figure>
            <img alt="Page not found" className="not-found-image" src={image.publicURL}/>
          </figure>
        }
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
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
        }
      }
    }
  }
`
