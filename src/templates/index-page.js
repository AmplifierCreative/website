import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

import danielWhiteShow from '../img/clients/The_Daniel_White_Show_new.png'
import freePizza from '../img/clients/FPP_podStack_color.png'
import audpop from '../img/clients/AA_AudPop_Stacked_Color.png'
import cardinal from '../img/clients/cardinal_joinery.png'

const headerStyle = {
  backgroundColor: '#2D2C2C',
}

const titleText = {
  color: '#F8F3F1',
  fontFamily: 'VisbyCF-Bold',
  fontWeight: '400',
  fontSize: '4rem',
}

const arrowContainer = {
  width: '100%',
  textAlign: 'center',
  marginTop: '6em',
  marginBottom: '6em',
}

const arrowDown = {
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '33.53px',
  height: '33.53px',
  border: 'solid #F8F3F1',
  borderWidth: '0 2px 2px 0',
  color: '#2D2C2C',
  transform: 'rotate(45deg)',
  webkitTtransform: 'rotate(45deg)',
  zIndex: '2',
}

const subTitleTextA = {
  color: '#F8F3F1',
  fontFamily: 'EBGaramond',
  fontWeight: '400',
  fontSize: '1.5rem',
  maxWidth: '760px',
  marginTop: '2.5rem',
}

const subTitleTextB = {
  color: '#F8F3F1',
  fontFamily: 'EBGaramond',
  fontWeight: '400',
  fontSize: '1.5rem',
  maxWidth: '760px',
}

const sectionTitleA = {
  fontSize: '1em',
  fontWeight: '500',
  fontFamily: 'VisbyCF-Medium',
  transform: 'rotate(270deg)',
  textTransform: 'uppercase',
  position: 'absolute',
  width: '90px',
  letterSpacing: '2px',
}

const sectionTitleB = {
  fontSize: '1em',
  fontWeight: '500',
  fontFamily: 'VisbyCF-Medium',
  transform: 'rotate(270deg)',
  textTransform: 'uppercase',
  position: 'absolute',
  width: '90px',
  letterSpacing: '2px',
}

const sectionContainer = {
  position: 'relative',
}

const sectionTitle = {
  fontSize: '1em',
  fontWeight: '500',
  fontFamily: 'VisbyCF-Medium',
  transform: 'rotate(270deg)',
  textTransform: 'uppercase',
  position: 'absolute',
  bottom: '230px',
  width: '90px',
  letterSpacing: '2px',
}

const sectionSubhead = {
  fontSize: '1.9em',
  fontFamily: 'VisbyCF-Regular',
  fontWeight: '400',
}

const aboutTitle = {
  fontSize: '2.5em',
}

const aboutText = {
  fontSize: '1.5em',
}

const aboutText2 = {
  fontSize: '1.5em',
  marginTop: '1em',
}

const orangeHeaderText = {
  color: '#BA5930',
  fontSize: '1em',
  textTransform: 'uppercase',
  fontWeight: '500',
  fontFamily: 'VisbyCF-Medium',
  paddingBottom: '1em',
  letterSpacing: '2px',
}

const servicesText = {
  fontSize: '2.5em',
  lineHeight: '1.75em',
}

const clientsTitle = {
  fontSize: '2.5em',
  marginBottom: '1em',
}

const placeHolderCard = {
  backgroundColor: '#F8F3F1',
  width: '200px',
  height: '200px',
}

const verticalAlignHelper = {
  display: 'inline-block',
  height: '100%',
  verticalAlign: 'middle',
}

const imgStyle = {
  verticalAlign: 'middle',
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
    <section style={headerStyle} className="hero is-medium">
      <div className="hero-body">
        <div className="container is-max-widescreen">
          <h1 className="title" style={titleText}>
            Your new creative team has arrived
          </h1>
          <div className="header-arrow-container" style={arrowContainer}><div style={arrowDown}></div></div>
          <h2 className="subtitle" style={subTitleTextA}>
            amplifier creative is a modernized creative agency catered toward
            up-and-coming businesses, driven entrepreneurs, and committed
            creative endeavors of all kinds.
          </h2>
          <h2 className="subtitle" style={subTitleTextB}>
            We’re the next generation of creators and critical thinkers who want
            success to always be within arm’s reach—with an overarching goal of
            instilling positivity, inclusivity, and inspiration in each
            community we serve.
          </h2>
        </div>
      </div>
    </section>
    <div className="container is-max-widescreen">
      <section className="section--gradient home-about-section" style={sectionContainer}>
        <div className="section">
          <div className="columns is-vcentered">
            <div className="column is-6 has-text-centered home-section-mobile-padding">
              <div className="columns is-mobile">
                <div className="column is-2">
                  <h4 className="home-sideways-title-about" style={sectionTitleA}>About Us</h4>
                </div>
                <div className="column is-9">
                  <h6 style={orangeHeaderText}>xx</h6>
                  <h2 style={aboutTitle}>
                    Community-focused.
                  </h2>
                  <h3 style={sectionSubhead}>Creative-driven.</h3>
                </div>
              </div>
            </div>
            <div className="column is-6">
              <p className="first-letter-stroke" style={aboutText}>
                Agencies are everywhere—all specializing in one thing or
                another, or everything under the sun. While we love those
                agencies (and have even worked for them), we understand they’re
                not as accessible for growing businesses and new creative
                endeavors.
                <br />
              </p>
              <p style={aboutText2}>
                That’s why we’re here to break through that noise by providing a
                resource that allows all businesses and entrepreneurs to feel
                comfortable asking for help with their advertising, marketing,
                and creative.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="home-section" style={sectionContainer}>
        <div className="section">
          <div className="columns is-vcentered">
            <div className="column is-12 has-text-centered home-section-mobile-padding">
              <div className="columns is-mobile">
                <div className="column is-2">
                  <h4 className="home-sideways-title-services" style={sectionTitleB}>Services</h4>
                </div>
                <div className="column is-9">
                  <h6 style={orangeHeaderText}>xx</h6>
                  <h3 style={sectionSubhead}>We’re passionate about:</h3>
                  <h3 style={servicesText}>Copywriting + editing</h3>
                  <h3 style={servicesText}>Design</h3>
                  <h3 style={servicesText}>Social</h3>
                  <h3 style={servicesText}>Strategy</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-section home-client-section" style={sectionContainer}>
        <div className="columns is-mobile is-vcentered">
          <div className="column is-2 has-text-centered home-section-mobile-padding">
            <h4 className="home-sideways-title-clients" style={sectionTitle}>Clients</h4>
          </div>
          <div className="column is-9 has-text-centered">
            <h6 style={orangeHeaderText}>xx</h6>
            <h5 style={clientsTitle}>We’re in good company</h5>
            <div className="columns">
              <div className="column">
                <div className="columns is-mobile">
                  <div className="column is-6-mobile">
                    <a title="Free Pizza Podcast" href="#">
                      <img src={freePizza} alt="Free Pizza Podcast" />
                    </a>
                  </div>
                  <div className="column is-6-mobile">
                    <a title="Daniel White Show" href="#">
                      <img src={danielWhiteShow} alt="Daniel White Show" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="columns is-mobile">
                  <div className="column is-6-mobile">
                    <a title="Free Pizza Podcast" href="#">
                    <img src={audpop} alt="Audpop" style={imgStyle} />
                    </a>
                  </div>
                  <div className="column is-6-mobile">
                    <a title="Daniel White Show" href="#">
                    <img src={cardinal} alt="Cardinal Joinery Logo" style={imgStyle} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
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
