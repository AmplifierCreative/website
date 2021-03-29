import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import { kebabCase } from 'lodash'

class PortfolioFilter extends React.Component {
  render() {
    const { data } = this.props
    console.log(data)
    console.log(this.props)
    const { group: tags } = data.allMarkdownRemark

    return (
      <section className='section filter' style={{ marginBottom: '0' }}>
        <div className='container content'>
          <div className='columns'>
            <div className='column is-10 is-offset-1 has-text-centered'>
              <h1 className='title'>Filter by: </h1>
              <ul className='taglist'>
                <li>
                  <Link to='/projects'>All</Link>
                </li>
                {tags &&
                  tags.map((tag) => (
                    <li key={tag.fieldValue}>
                      <Link
                        to={`/projects/tags/${kebabCase(tag.fieldValue)}/`}
                        activeStyle={{
                          textDecoration: 'underline',
                          color: '#FAB395',
                        }}
                        className='tag-link'
                      >
                        {tag.fieldValue}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
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
    `}
    render={(data) => <PortfolioFilter data={data} />}
  />
)
