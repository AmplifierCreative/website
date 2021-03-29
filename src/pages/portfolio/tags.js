import React from 'react'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'
import PortfolioFilter from './filter'
import PortfolioHero from './hero'

const PortfolioTagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <PortfolioHero />
    <PortfolioFilter />
    <section className='section'>
      <Helmet title={`Tags | ${title}`} />
      <div className='container is-max-widescreen content'>
        <div className='columns'>
          <div className='column' style={{ marginBottom: '6rem' }}>
            <h1 className='title is-size-2 is-bold-light'>Tags</h1>
            <ul className='taglist'>
              {group.map((tag) => (
                <li key={tag.fieldValue}>
                  <Link to={`${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default PortfolioTagsPage

export const portfolioTagPageQuery = graphql`
  query PortfolioTagsQuery {
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
