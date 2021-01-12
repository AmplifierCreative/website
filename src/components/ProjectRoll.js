import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { Trail, animated } from 'react-spring/renderprops'

class ProjectRoll extends React.Component {

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    const items = posts
    const blackStyle = {
      color: '#2D2C2C',
      marginTop: 0,
    }
    return (
      <div className="project">
        <Trail 
          native
          items={items} 
          keys={items.map((_, i) => i)} 
          from={{ opacity: 0, y: 100 }}
          to={{ opacity: 1 , y: 0  }}>
           {item => ({ y, opacity }) => (
              <animated.div 
                style={{
                  opacity,
                  transform: y.interpolate(y => `translate3d(0,${y}%,0)`),
                }} 
                className="columns mb-2 is-vcentered">         
                <div className="column has-text-centered">
                  <h4 className="vertical-text">{item.node.frontmatter.tags}</h4>
                  <div className="project-container">
                    <span className="is-block is-uppercase orange-text">
                      {/* {post.frontmatter.date} */}
                      Client Name
                    </span>
                    <h1 className="post-meta mt-0">
                      <Link
                        className="title is-size-2"
                        to={item.node.fields.slug}
                        style={blackStyle}
                      >
                        {item.node.frontmatter.title}
                      </Link>
                    </h1>
                    <p>
                      {item.node.excerpt}
                      <br />
                      <br />
                    </p>
                    <Link className="button" to={item.node.fields.slug}>
                      View More
                    </Link>
                  </div>
                </div>             
                <div className="column" key={item.node.id}>
                  {item.node.frontmatter.featuredimage ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: item.node.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${item.node.frontmatter.title}`,
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </animated.div>
            )}
        </Trail>
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
                tags
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 650, quality: 100) {
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
