import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

const thankYouContainer = {
  marginTop: '7em',
  marginBottom: '7em',
  padding: '2rem',
}

const thankYou = {
  maxWidth: '844px',
  margin: 'auto',
}

const aboutTitle = {
  color: '#BA5930',
  fontSize: '3em',
}

const aboutText = {
  fontSize: '1.65em',
}


const ThankYouPageTemplate = ({
  heading,
  subheading,
  link,
}) => (
  <React.Fragment>
    <Helmet>
      <body className="menu-color-2" />
    </Helmet>  
    <section style={thankYouContainer} className="page-padding">
      <div className="container is-max-widescreen">
        <div className="columns">
          <div className="column" style={thankYou}>              
          <h2 className="title" style={aboutTitle}>
            {heading}
          </h2>
          <p style={aboutText}>
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
