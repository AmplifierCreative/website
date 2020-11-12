import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { Helmet } from 'react-helmet'

class ProjectRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    const clientNameStyle = {
      color: '#BA5930',
      fontFamily: 'VisbyCF-Regular',
      marginTop: '40px',
    }

    const blackStyle = {
      color: '#2D2C2C',
      marginTop: 0,
    }

    const buttonStyle = {
      width: '40%',
      float: 'right',
      height: '100%',
      borderRadius: '0px',
      color: '#BA5930',
      backgroundColor: 'rgba(196, 196, 196, 0.25)',
    }

    return (
      <div className="project">
        <Helmet>
          <body className="menu-color-2" />
        </Helmet>
        {posts &&
          posts.map(({ node: post }) => (
            <div className="columns mb-2">
              <div class="column has-text-centered">
                <span className="is-block is-uppercase orange-text">
                  {/* {post.frontmatter.date} */}
                  Client Name
                </span>
                <h1 className="post-meta mt-0">
                  <Link
                    className="title is-size-2"
                    to={post.fields.slug}
                    style={blackStyle}
                  >
                    {post.frontmatter.title}
                  </Link>
                </h1>
                <p>
                  {post.excerpt}
                  <br />
                  <br />
                </p>
              </div>
              <div className="column" key={post.id}>
                {/* <Link
                  className="button"
                  to={post.fields.slug}
                  style={buttonStyle}
                >
                  Keep Reading →
                </Link> */}
                {post.frontmatter.featuredimage ? (
                  <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                      }}
                    />
                  </div>
                ) : null}
              </div>
              <br />
            </div>
          ))}
      </div>
    )
  }
}

ProjectRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query ProjectRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "project-post" } } }
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
                templateKey
                date(formatString: "MMMM DD, YYYY")
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
    render={(data, count) => <ProjectRoll data={data} count={count} />}
  />
)
