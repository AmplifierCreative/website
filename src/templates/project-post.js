import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Testimonials from '../components/Testimonials'
import Statistics from '../components/Statistics'
import Content, { HTMLContent } from '../components/Content'

const titleText = {
  fontFamily: 'VisbyCF-Bold',
  fontWeight: '400',
  fontSize: '4rem',
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

  return (
    <div>
      <section className="hero is-small">
        <div
          className="hero-body"
          style={{ minHeight: '30vh', paddingTop: '10vh' }}
        >
          <div className="container is-max-widescreen">
            <h1 className="title" style={titleText}>
              {title}
            </h1>
          </div>
        </div>
      </section>
      <section className="section">
        {helmet || ''}
        <div className="container is-max-widescreen content">
          <div className="columns">
            <div className="column is-two-thirds overview">
              <h2 className="orange-text">Overview</h2>
              <p>{description}</p>
            </div>
            <div className="column is-one-third">
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
              <PostContent content={content} />
              <h2 className="orange-text">The Result</h2>
              <p>{result}</p>
              {statistics && statistics.length ? (
                <Statistics statistics={statistics} />
              ) : null}
              {testimonials && testimonials.length ? (
                <Testimonials testimonials={testimonials} />
              ) : null}
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
