import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Testimonials from '../components/Testimonials'
import Statistics from '../components/Statistics'
import Content, { HTMLContent } from '../components/Content'

const titleText = {
  fontFamily: 'VisbyCF-Bold',
  fontWeight: '400',
  fontSize: '6rem',
}

const buttonStyle = {
  width: '244px',
  height: '51px',
}

const contactText = {
  fontFamily: 'VisbyCF-Regular',
  fontSize: '2.25em',
}

const contactHeader = {
  marginBottom: 0,
}

const projectBody = {
  marginBottom: '100px',
}

const resultText = {
  marginBottom: '100px',
  fontFamily: 'VisbyCF-Bold',
  fontWeight: '400',
  fontSize: '2.25em',
}

const portfolioCTAContainer = {
  marginBottom: '100px',
}

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
  console.log(PostContent)
  return (
    <div>
      <section className="hero is-small">
        <div
          className="hero-body"
          style={{ minHeight: '30vh', paddingTop: '10vh' }}
        >
          <div className="container is-max-widescreen">
            <div className="columns">
              <div className="column is-8 is-offset-2">
                <h1 className="title" style={titleText}>
                  {title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        {helmet || ''}
        <div className="container is-max-widescreen content">
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <div className="columns">
                <div className="column is-9 overview">
                  <h2 className="orange-text">Overview</h2>
                  <p>{description}</p>
                </div>
                <div className="column is-3">
                  {tags && tags.length ? (
                    <div>
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
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="columns">
                <div className="column is-full">
                  <h2 className="orange-text">What We Did</h2>
                  <div style={projectBody} className="project-body">
                    <PostContent content={content} />
                  </div>
                  <h2 className="orange-text">The Result</h2>
                  <p style={resultText}>{result}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="container is-max-widescreen content">
            <div className="columns">
              <div className="column is-full">
                {statistics && statistics.length ? (
                  <Statistics statistics={statistics} />
                ) : null}

                {testimonials && testimonials.length ? (
                  <div className="columns">
                    <div className="column is-8 is-offset-2">
                      <Testimonials testimonials={testimonials} />
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
      <ProjectPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Project">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
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
        className="section portfolio-cta-container"
        style={portfolioCTAContainer}
      >
        <div className="container is-max-widescreen">
          <div className="content">
            <h2 style={contactHeader}>Like What You See?</h2>
            <p style={contactText}>
              {' '}
              We can do something like this for you, too. Let's chat.
            </p>
            <Link to="/contact">
              <button className="button is-uppercase" style={buttonStyle}>
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
      }
    }
  }
`
