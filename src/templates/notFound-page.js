import React from 'react'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Content, { HTMLContent } from '../components/Content'


export const NotFoundPageTemplate = ({ title, image, content, contentComponent }) => {
  const PageContent = contentComponent || Content
  console.log(image)
  return (
    <main className="notfound-container page-padding" >
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
      <div className="container not-found-page notFound-text">
        <PageContent className="container not-found-page" content={content} />
      </div>
    </main>
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
