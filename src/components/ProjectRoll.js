import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { v4 } from 'uuid'
import { Trail, animated } from 'react-spring/renderprops'


class ProjectRoll extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      items: [ '1', '2' ],
    }
    this.toggleVisible = this.toggleVisible.bind(this)
  }

  toggleVisible = () => {
    this.setState({ active: !this.state.active })
  }

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    const blackStyle = {
      color: '#2D2C2C',
      marginTop: 0,
    }

    const _posts = () => 
    {posts &&
      posts.map(({ node: post }) => (
        <div className="columns mb-2 is-vcentered" key={v4()}>         
          <div className="column has-text-centered">
            <h4 className="vertical-text">{post.frontmatter.tags}</h4>
            <div className="project-container">
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
              <Link className="button" to={post.fields.slug}>
                View More
              </Link>
            </div>
          </div>             
          <div className="column" key={post.id}>
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

    return (
      <div className="project">
      <button onClick={this.toggleVisible}>Click</button>
      <Trail 
        items={this.state.items} 
        keys={v4()} 
        from={{ opacity: 0 }}
        to={{ 
          opacity: this.state.active ? 1 : 0, 
        }}>
        {item => ({ opacity }) => (
            <animated.div
              style={{ opacity }}>
              <p>hello world</p>
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
