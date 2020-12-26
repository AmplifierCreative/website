import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'

const parentContainer = {
  paddingTop: '4em',
  paddingBottom: '8em',
  paddingLeft: '1em',
  paddingRight: '1em',
}

const tableContainer = {
  margin: '1.75em',
  paddingBottom: '1em',
}
export const GlobalPageTemplate = ({
  footer,
  nav,
  content, 
  contentComponent 
}) => {
  const PageContent = contentComponent || Content
  console.log(contentComponent)
  return (   
    <div className="container is-max-widescreen" style={parentContainer}>
    <Helmet>
      <body className="menu-color-2" />
    </Helmet>
      <div className="">
        <div className="global-header-container">
            <h3 className="global-header">Navigation</h3>
        </div>
        <div className="">
          <h4>Menu:</h4>
        </div>
        <div style={tableContainer}>
          <table className="table">
            <thead>
              <th className="theader">Label</th>
              <th className="theader">Path</th>
              <th className="theader">Internal</th>
            </thead>
            {nav && nav.map((item) => (
              <tr className="table-row">
                <td className="td">{item.text}</td>
                <td className="td">{item.path}</td>
                <td className="td">{item.local.toString()}</td>
              </tr>
            )) 
            }
          </table>
        </div>
      </div>
      <div>
        <div className="global-header-container">
          <h3 className="global-header">Footer</h3>
        </div> 
      <div className="">
        <div className="">
          <h4>Menu:</h4>
        </div>
        <div style={tableContainer}>
          <table className="table">
            <thead>
              <th className="theader">Label</th>
              <th className="theader">Path</th>
              <th className="theader">Internal</th>
            </thead>
            {footer.menu && footer.menu.map((item) => (
              <tr className="table-row">
                <td className="td">{item.text}</td>
                <td className="td">{item.path}</td>
                <td className="td">{item.local.toString()}</td>
              </tr>
            )) 
            }
          </table>
        </div>
      </div>
      <div className="">
        <div>
          <h4>Social Paths:</h4>
        </div>
        <div style={tableContainer}>
          <table className="table">
            <thead>
              <th className="theader">Path</th>
              <th className="theader">Internal</th>
            </thead>
            {footer.social && footer.social.map((item) => (
              <tr className="table-row">
                <td className="td">{item.path}</td>
                <td className="td">{item.local.toString()}</td>
              </tr>
            )) 
            }
          </table>
        </div>
        </div>
        <div className="">
          <div>
            <h4>Copyright:</h4>
          </div>
          <div style={tableContainer}>
            <div>
              <PageContent content={content} />
            </div>
          </div>
        </div>
      </div>
    </div>
)}

GlobalPageTemplate.propTypes = {
  footer: PropTypes.shape({
    menu: PropTypes.array,
    social: PropTypes.array,
  }),
  nav: PropTypes.array,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
}

const GlobalPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <GlobalPageTemplate
        footer={frontmatter.footer}
        nav={frontmatter.nav}
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

GlobalPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default GlobalPage

export const pageQuery = graphql`
  query GlobalPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "global-page" } }) {
      frontmatter {
        nav {
            text
            local
            path
        }  
        footer {
            menu {
                text
                local
                path
            }
            social {
                local
                path
            }
        }
      }
    }
  }
`
