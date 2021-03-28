import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'

import Layout from '../../components/Layout'
import ProjectRoll from '../../components/ProjectRoll'
import SEO from '../../components/Seo'
import ProjectsFilter from './filter'
import ProjectsHero from './hero'

const ProjectsIndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO
        title={posts[0].node.frontmatter.projects.seo.title}
        description={posts[0].node.frontmatter.projects.seo.description}
        image={posts[0].node.frontmatter.projects.seo.image.name}
      />
      <ProjectsHero />
      <ProjectsFilter />
      <main className='section'>
        <div className='container is-max-widescreen'>
          <div className='content'>
            <ProjectRoll />
          </div>
        </div>
      </main>
    </Layout>
  )
}

ProjectsIndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query ProjectsIndexPageQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "global-page" } } }
        ) {
          edges {
            node {
              frontmatter {
                templateKey
                projects {
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
          }
        }
      }
    `}
    render={(data) => <ProjectsIndexPage data={data} />}
  />
)
