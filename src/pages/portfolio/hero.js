import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'

import { FadeIn } from '../../components/Utilities'

const config = { mass: 5, tension: 2000, friction: 200 }

const PortfolioHero = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark
  const { heading, subheading, cta } = posts[0].node.frontmatter.portfolio.hero

  return (
    <div className='page-padding about-page-container'>
      <div className='container is-max-widescreen about-hero-container'>
        <FadeIn configuration={config}>
          <h1 className='line-header portfolio-line-header'>{heading}</h1>
          <h2 className='portfolio-subheading'>{subheading}</h2>
          <Link to='/contact'>
            <button className='button dk is-uppercase services-button projects-btn'>
              {cta}
            </button>
          </Link>
          <br />
        </FadeIn>
      </div>
    </div>
  )
}

PortfolioHero.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query PortfolioHeroQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "global-page" } } }
        ) {
          edges {
            node {
              frontmatter {
                templateKey
                portfolio {
                  hero {
                    heading
                    subheading
                    cta
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => <PortfolioHero data={data} />}
  />
)
