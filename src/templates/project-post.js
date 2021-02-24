import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import { v4 } from 'uuid'


import Layout from '../components/Layout'
import Testimonials from '../components/Testimonials'
import Statistics from '../components/Statistics'
import Content, { HTMLContent } from '../components/Content'
import SEO from '../components/Seo'
import { FadeIn } from '../components/Utilities'

const config = { mass: 5, tension: 2000, friction: 200 }

export const ProjectPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  result,
  testimonials,
  statistics,
}) => {
  const PostContent = contentComponent || Content
  return (
    <div className="page-padding">
      <FadeIn configuration={config}>
        <section className="hero is-small">
          <div
            className="hero-body"
            style={{ minHeight: '30vh', paddingTop: '10vh' }}
          >
            <div className="container is-max-widescreen">
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <h1 className="title project-title-text">
                    {title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
      <section className="section">
        {helmet || ''}
        <div className="container is-max-widescreen content">
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <div className="columns">
                <div className="column is-9 overview">
                  <FadeIn configuration={config}>
                    <h2 className="orange-text">Overview</h2>
                    <p>{description}</p>
                  </FadeIn>
                </div>
                <div className="column is-3">
                  {tags && tags.length ? (
                    <div>
                      <FadeIn configuration={config}>
                        <h2 className="orange-text">Services</h2>
                        <ul className="taglist" style={{ marginTop: 0 }}>
                          {tags.map((tag) => (
                            <li key={tag + `tag`}>
                              {/* <Link to={`/projects/tags/${kebabCase(tag)}/`}> */}
                              <span style={{ fontSize: '1.5em' }}>{tag}</span>
                              {/* </Link> */}
                            </li>
                          ))}
                        </ul>
                      </FadeIn>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="columns">
                <div className="column is-full">
                  <h2 className="orange-text">What We Did</h2>
                  <div className="project-body">
                    <FadeIn configuration={config}>
                      <PostContent content={content} />
                    </FadeIn>
                  </div>
                  <FadeIn configuration={config}>
                    <h2 className="orange-text">The Result</h2>
                    <p className="project-result-text">{result}</p>
                  </FadeIn>
                </div>
              </div>
            </div>
          </div>
          <div class="container is-max-widescreen content">
            <div className="columns">
              <div className="column is-full">
                {statistics && statistics.length ? (
                  <FadeIn configuration={config}>
                    <Statistics statistics={statistics} />
                  </FadeIn>
                ) : null}

                {testimonials && testimonials.length ? (
                  <div className="columns">
                    <div className="column is-8 is-offset-2">
                      <FadeIn configuration={config}>
                        <Testimonials testimonials={testimonials} />
                      </FadeIn>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

ProjectPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  result: PropTypes.string,
  helmet: PropTypes.object,
  testimonials: PropTypes.array,
}

const ProjectPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SEO
        title={post.frontmatter.seo.title}
        description={post.frontmatter.seo.description || 'Blog'}
        image={post.frontmatter.seo.image.name || null}
        pathname={post.frontmatter.seo.slug || null}
        article={true}
      />
      <ProjectPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet>
            <body className="menu-color-2" />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        result={post.frontmatter.result}
        testimonials={post.frontmatter.testimonials}
        statistics={post.frontmatter.statistics}
      />
      <section
        className="section portfolio-cta-container project-cta-container"
      >
        <div className="container is-max-widescreen">
          <div className="content">
            <h2 className="project-contact-header">Like What You See?</h2>
            <p className="project-contact-text">
              {' '}
              We can do something like this for you, too. Let's chat.
            </p>
            <Link to="/contact">
              <button className="button is-uppercase project-button-style">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

ProjectPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ProjectPost

export const pageQuery = graphql`
  query ProjectPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        result
        testimonials {
          author
          quote
          authorBio
        }
        statistics {
          number
          blurb
        }
        seo {
          title
          description
          image {
            name
          }
        }
      }
    }
  }
`
