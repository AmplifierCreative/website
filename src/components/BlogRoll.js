import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { Helmet } from 'react-helmet'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    const blackStyle = {
      color: '#2D2C2C',
      marginTop: 0,
    }

    return (
      <div className="blog">
        <Helmet>
          <body className="menu-color-2" />
        </Helmet>
        {posts &&
          posts.map(({ node: post }) => (
            <div className="columns mb-2">
              <div className="column is-8 is-offset-2" key={post.id}>
                <article>
                  <header>
                    {/* {post.frontmatter.featuredimage ? (
                      <div className="featured-thumbnail">
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: post.frontmatter.featuredimage,
                            alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                          }}
                        />
                      </div>
                    ) : null} */}
                    <span className="is-block is-uppercase orange-text">
                      {post.frontmatter.date} x {post.fields.readingTime.text}
                    </span>
                    <h1 className="post-meta mt-0">
                      <Link
                        className="title is-size-3"
                        to={post.fields.slug}
                        style={blackStyle}
                      >
                        {post.frontmatter.title}
                      </Link>
                      <span> &bull; </span>
                    </h1>
                  </header>
                  <p>
                    {post.excerpt}
                    <br />
                    <br />
                    {/* <Link className="button" to={post.fields.slug}>
                      Keep Reading →
                    </Link> */}
                  </p>
                </article>
              </div>
              <br />
            </div>
          ))}
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
                readingTime {
                  text
                }
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
