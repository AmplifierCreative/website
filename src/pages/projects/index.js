import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'
import ProjectRoll from '../../components/ProjectRoll'
import { kebabCase } from 'lodash'

const ProjectsIndexPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <div
      className="full-width-image-container has-text-left margin-top-0"
      style={{
        // backgroundImage: `url('/img/blog-index.jpg')`,
        backgroundColor: '#2D2C2C',
      }}
    >
      <div class="container is-max-widescreen">
        <h1 className="line-header">portfolio</h1>
        <h2
          style={{
            fontFamily: 'VisbyCF-Regular',
            fontSize: '1.5em',
          }}
        >
          Want to join the list? Let's make something you love.
        </h2>
        <br />
        <Link to="/contact">
          <button class="button is-uppercase">Let's Chat</button>
        </Link>
      </div>
    </div>
    <section className="section filter" style={{ marginBottom: '0' }}>
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1 has-text-centered">
            <h1 className="title">Filter By: </h1>
            <ul className="taglist">
              <li>
                <Link to="/projects">All</Link>
              </li>
              {group.map((tag) => (
                <li key={tag.fieldValue}>
                  <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="container is-max-widescreen">
        <div className="content">
          <ProjectRoll />
        </div>
      </div>
    </section>
  </Layout>
)

export default ProjectsIndexPage

export const projectsPageQuery = graphql`
  query ProjectTagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
