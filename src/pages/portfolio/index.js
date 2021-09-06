import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'

import Layout from '../../components/Layout'
import PortfolioRoll from '../../components/PortfolioRoll'
import SEO from '../../components/Seo'
import PortfolioFilter from './filter'
import PortfolioHero from './hero'

const PortfolioIndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO
        title={posts[0].node.frontmatter.portfolio.seo.title}
        description={posts[0].node.frontmatter.portfolio.seo.description}
        image={posts[0].node.frontmatter.portfolio.seo.image.name}
      />
      <PortfolioHero />
      <div style={{ overflowY: 'hidden', padding: '0 2rem' }}>
        <PortfolioFilter />
        <div className='container is-max-widescreen'>
          <div className='content'>
            <PortfolioRoll />
          </div>
        </div>
      </div>
    </Layout>
  )
}

PortfolioIndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query PortfolioIndexPageQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "global-page" } } }
        ) {
          edges {
            node {
              frontmatter {
                templateKey
                portfolio {
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
    render={(data) => <PortfolioIndexPage data={data} />}
  />
)
