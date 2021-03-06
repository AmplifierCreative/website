import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { FadeIn } from './Utilities'

class PortfolioRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    const blackStyle = {
      color: '#2D2C2C',
      marginTop: 0,
    }

    return (
      <div className='project'>
        {posts &&
          posts.map(({ node: post }) => (
            <div className='columns mb-4 is-vcentered' key={post.id}>
              <div className='column has-text-centered'>
                <FadeIn>
                  <h4 className='vertical-text'>{post.frontmatter.tags}</h4>
                  <div className='project-container'>
                    <span className='is-block is-uppercase orange-text'>
                      {/* {post.frontmatter.date} */}
                      {post.frontmatter.client}
                    </span>
                    <h1 className='post-meta mt-0'>
                      <Link
                        className='title is-size-2'
                        to={
                          !!post.frontmatter.seo
                            ? post.frontmatter.seo.slug
                            : post.fields.slug
                        }
                        style={blackStyle}
                      >
                        {post.frontmatter.title}
                      </Link>
                    </h1>
                    <p>
                      {post.frontmatter.blurb}
                      <br />
                      <br />
                    </p>
                    <div
                      className='column portfolio-mobile-image'
                      key={post.id}
                    >
                      {post.frontmatter.featuredimage ? (
                        <div className='featured-thumbnail'>
                          <PreviewCompatibleImage
                            imageInfo={{
                              image: post.frontmatter.featuredimage,
                              alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                    <Link
                      className='button'
                      to={
                        !!post.frontmatter.seo
                          ? post.frontmatter.seo.slug
                          : post.fields.slug
                      }
                    >
                      View More
                    </Link>
                  </div>
                </FadeIn>
              </div>
              <div className='column portfolio-desktop-image' key={post.id}>
                <FadeIn>
                  {post.frontmatter.featuredimage ? (
                    <div className='featured-thumbnail'>
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                      />
                    </div>
                  ) : null}
                </FadeIn>
              </div>
            </div>
          ))}
      </div>
    )
  }
}

PortfolioRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query PortfolioRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "portfolio-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                blurb
                client
                templateKey
                date(formatString: "MMMM DD, YYYY")
                tags
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 324, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                seo {
                  title
                  description
                  image {
                    name
                  }
                  slug
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <PortfolioRoll data={data} count={count} />}
  />
)
