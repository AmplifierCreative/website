import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import ProjectHero from '../pages/projects/hero'
import ProjectFilter from '../pages/projects/filter'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'


class ProjectTagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map((post) => (
      <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>
          <h2 className="is-size-2">{post.node.frontmatter.title}</h2>
        </Link>
      </li>
    ))
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
      const totalCount = this.props.data.allMarkdownRemark.totalCount
      const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
     } tagged with “${tag}”`
    const blackStyle = {
      color: '#2D2C2C',
      marginTop: 0,
    }
    const items = posts

    return (
      <Layout>
        <ProjectHero />
        <ProjectFilter />
        <section className="section">
          <Helmet title={`${tag} | ${title}`} />
          <div className="container is-max-widescreen content">
            <div className="columns">
              <div className="column" style={{ marginBottom: '6rem' }}>
                <h3 className="title is-size-4 is-bold-light">{tagHeader}</h3>
                <ul className="taglist">{postLinks}</ul>
                <div className="project">
                  {/* {items.map(() => {

                  })} */}
{/*                   <Trail
                    native
                    items={items}
                    keys={items.map((_, i) => i)}
                    from={{ opacity: 0, y: 100 }}
                    to={{ opacity: 1, y: 0 }}
                  >
                    {(item) => ({ y, opacity }) => (
                      <animated.div
                        style={{
                          opacity,
                          transform: y.interpolate(
                            (y) => `translate3d(0,${y}%,0)`
                          ),
                        }}
                        className="columns mb-2 is-vcentered"
                      >
                        <div className="column has-text-centered">
                          <h4 className="vertical-text">
                            {item.node.frontmatter.tags}
                          </h4>
                          <div className="project-container">
                            <span className="is-block is-uppercase orange-text">
                              {post.frontmatter.date}
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
                  </Trail> */}
                </div>
                <p>
                  <Link to="/projects/tags/">
                    <button className="button">Browse all tags</button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default ProjectTagRoute

export const tagPageQuery = graphql`
  query ProjectTagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 400)
          fields {
            slug
          }
          frontmatter {
            title
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
`
