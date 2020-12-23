import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

const parentContainer = {
  paddingTop: '4em',
  paddingBottom: '8em',
}

const tableContainer = {
  margin: '1.75em',
  paddingBottom: '1em',
}
export const GlobalPageTemplate = ({
  footer,
  nav,
}) => {
  return (   
    <div className="container is-max-widescreen" style={parentContainer}>
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
            </thead>
            {footer.social && footer.social.map((item) => (
              <tr className="table-row">
                <td className="td">{item.path}</td>
              </tr>
            )) 
            }
          </table>
        </div>
        </div>
        <div className="">
          <div>
            <h4>Copywrite</h4>
          </div>
          <div style={tableContainer}>
            <div>
              <p>{footer.copywrite}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
)}

GlobalPageTemplate.propTypes = {
  title: PropTypes.string,
  footer: PropTypes.object,
  nav: PropTypes.object,
}

const GlobalPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <GlobalPageTemplate
        footer={frontmatter.footer}
        nav={frontmatter.nav}
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
        footer {
            menu {
                text
                local
                path
            }
            copywrite
            social {
                text
                local
                path
            }
        }
        nav {
            text
            local
            path
        }  
      }
    }
  }
`
