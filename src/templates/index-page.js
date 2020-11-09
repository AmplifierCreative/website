import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'

const headerStyle = {
  backgroundColor: "#2D2C2C",
  height: "50vh",
};

const titleText = {
  color: "#F8F3F1",
  fontFamily: "VisbyCF-Bold",
  fontWeight: "800",
  fontSize: "3rem",
};

const subTitleText = {
  color: "#F8F3F1",
  fontFamily: "VisbyCF",
  fontWeight: "400",
  fontSize: "1rem",
  maxWidth: "50%",
}

const sectionTitle = {
  transform: "rotate(270deg)",
}

const placeHolderCard = {
  backgroundColor: "#938C89",
  width: "200px",
  height: "200px",
}

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => (
  <div>
    <section style={headerStyle} class="hero is-info is-large">
    <div class="hero-body">
      <div class="container">
        <h1 class="title" style={titleText}>
          You have needs.<br/>We have ideas.
        </h1>
        <h2 class="subtitle" style={subTitleText}>
        amplifier creative is a modernized creative agency catered toward up-and-coming businesses, driven entrepreneurs, and committed creative endeavors of all kinds.<br />
        We’re the next generation of creators and critical thinkers who want success to always be within arm’s reach—with an overarching goal of instilling positivity, inclusivity, and inspiration in each community we serve.
        </h2>
      </div>
    </div>
    </section>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-2">
              <h4 style={sectionTitle}>About Us</h4>
            </div>
            <div className="column is-5">
              <div className="content">
                <div className="content">
                  <div className="tile">
                    <h1 className="title">We are blah blah</h1>
                  </div>
                  <div className="tile">
                    <h3 className="subtitle">Lorem ipsum lorem</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-5">
              <p>
              Agencies are everywhere—all specializing in one thing or another, or everything under the sun. While we love those agencies (and have even worked for them), we understand they’re not as accessible for growing businesses and new creative endeavors.<br/> 
              That’s why we’re here to break through that noise by providing a resource that allows all businesses and entrepreneurs to feel comfortable asking for help with their advertising, marketing, and creative.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-2">
              <h4 style={sectionTitle}>Services</h4>
            </div>
            <div className="column is-10">
              <h6>We're Pros in:</h6>
              <h5>Copywriting + editing</h5>
              <h5>Design</h5>
              <h5>Social</h5>
              <h5>Strategy</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns is-vcentered">
            <div className="column is-2">
              <h4 style={sectionTitle}>Clients</h4>
            </div>
            <div className="column is-10">
              <h5>We're in good company</h5>
              <div className="columns">
                <div className="column">
                  <div style={placeHolderCard}></div>
                </div>
                <div className="column">
                    <div style={placeHolderCard}></div>
                </div>
                <div className="column">
                    <div style={placeHolderCard}></div>
                </div>
                <div className="column">
                    <div style={placeHolderCard}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
