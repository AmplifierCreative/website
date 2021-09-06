import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'
import SEO from '../../components/Seo'

const BlogIndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark
  console.log(posts)
  return (
    <Layout>
      <SEO
        title={posts[0].node.frontmatter.blog.title}
        description={posts[0].node.frontmatter.blog.description}
        image={posts[0].node.frontmatter.blog.image.name}
      />
      <div className='container page-padding is-max-widescreen'>
        <div className='content'>
          <BlogRoll />
        </div>
      </div>
    </Layout>
  )
}

BlogIndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogIndexPageQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "global-page" } } }
        ) {
          edges {
            node {
              frontmatter {
                templateKey
                blog {
                  title
                  description
                  image {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => <BlogIndexPage data={data} />}
  />
)
