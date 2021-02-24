import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

const ThankYouPageTemplate = ({
  heading,
  subheading,
  link,
}) => (
  <React.Fragment>
    <Helmet>
      <body className="menu-color-2" />
    </Helmet>  
    <section className="page-padding thankyou-container">
      <div className="container is-max-widescreen">
        <div className="columns">
          <div className="column thankyou">              
          <h2 className="title thankyou-about-title">
            {heading}
          </h2>
          <p className="thankyou-about-text">
            {subheading}
            <span>
              { 
                link.local ?
                  <Link to={link.path} className="link-underline">
                    {link.text}
                  </Link> :
                  <a href={link.path} className="link-underline">
                    {link.text}
                  </a>
              }
            </span>
          </p>
          </div>
        </div>
      </div>
    </section>
  </React.Fragment>
)

ThankYouPageTemplate.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  link: PropTypes.object,
}

const ThankYouPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

return (
  <Layout>
    <ThankYouPageTemplate
      heading={frontmatter.thanks.heading}
      subheading={frontmatter.thanks.subheading}
      link={frontmatter.thanks.link}
    />
  </Layout>
  )
}

ThankYouPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ThankYouPage

export const pageQuery = graphql`
  query ThankYouPage {
    markdownRemark (frontmatter: { templateKey: { eq: "contact-page" } }) {
      frontmatter {
        thanks {
          heading
          subheading
          link {
            text
            local
            path
          }
        }
      }
    }
  }
`
