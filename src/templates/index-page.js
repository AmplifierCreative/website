import React, { useEffect, useRef } from 'react'
import { animated, useSpring } from 'react-spring'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Carousel from '../components/Carousel'

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

const calc = (o) => `translateY(${o * 0.1}px)`
const calc2 = (o) => `translateY(${o * 0.5}px)`
const calc3 = (o) => `translateY(${o * 1}px)`

export const IndexPageTemplate = ({
  image,
  title,
  hero,
  about,
  services,
  clients,
}) => {
  const ref = useRef()
  const ref2 = useRef()
  const ref3 = useRef()

  const [{ offset }, set] = useSpring(() => ({ offset: 0 }))
  const [{ offset2 }, set2] = useSpring(() => ({ offset2: 20 }))
  const [{ offset3 }, set3] = useSpring(() => ({ offset3: 40 }))

  const handleScroll = () => {
    const posY = ref.current.getBoundingClientRect().top
    const offset = window.pageYOffset - posY
    set({ offset })
  }

  const handleScroll2 = () => {
    const posY = ref2.current.getBoundingClientRect().top
    const offset2 = window.pageYOffset - posY
    set2({ offset2 })
  }

  const handleScroll3 = () => {
    const posY = ref3.current.getBoundingClientRect().top
    const offset3 = window.pageYOffset - posY
    set3({ offset3 })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleScroll2)
    window.addEventListener('scroll', handleScroll3)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleScroll2)
      window.removeEventListener('scroll', handleScroll3)
    }
  })
  return (
    <div>
      <section style={headerStyle} className="hero is-medium">
        <div className="hero-body">
          <div className="container is-max-widescreen">
            <animated.h1
              ref={ref}
              className="title"
              style={{
                color: '#F8F3F1',
                fontFamily: 'VisbyCF-Bold',
                fontWeight: '400',
                fontSize: '4rem',
                transform: offset.interpolate(calc),
              }}
            >
              {hero.heading}
            </animated.h1>
            <div className="header-arrow-container" style={arrowContainer}>
              <div style={arrowDown}></div>
            </div>
            <animated.h2
              ref={ref2}
              className="subtitle"
              style={{
                color: '#F8F3F1',
                fontFamily: 'EBGaramond',
                fontWeight: '400',
                fontSize: '1.5rem',
                maxWidth: '760px',
                marginTop: '2.5rem',
                transform: offset2.interpolate(calc2),
              }}
            >
              {hero.subheading}
            </animated.h2>
            <animated.h2
              ref={ref3}
              className="subtitle"
              style={{
                color: '#F8F3F1',
                fontFamily: 'EBGaramond',
                fontWeight: '400',
                fontSize: '1.5rem',
                maxWidth: '760px',
                marginTop: '2.5rem',
                transform: offset3.interpolate(calc3),
              }}
            >
              {hero.description}
            </animated.h2>
          </div>
        </div>
      </section>
      <div className="container is-max-widescreen">
        <section
          className="section--gradient home-about-section"
          style={sectionContainer}
        >
          <div className="section">
            <div className="columns is-vcentered">
              <div className="column is-6 has-text-centered home-section-mobile-padding">
                <div className="columns is-mobile">
                  <div className="column is-2">
                    <h4
                      className="home-sideways-title-about"
                      style={sectionTitleA}
                    >
                      {about.title}
                    </h4>
                  </div>
                  <div className="column is-9">
                    <h6 style={orangeHeaderText}>xx</h6>
                    <h2 style={aboutTitle}>{about.heading}</h2>
                    <h3 style={sectionSubhead}>{about.subheading}</h3>
                  </div>
                </div>
              </div>
              <div className="column is-6">
                <p className="first-letter-stroke" style={aboutText}>
                  {about.description1}
                </p>
                <p style={aboutText2}>{about.description2}</p>
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
                    <h4
                      className="home-sideways-title-services"
                      style={sectionTitleB}
                    >
                      {services.title}
                    </h4>
                  </div>
                  <div className="column is-9">
                    <h6 style={orangeHeaderText}>xx</h6>
                    <h3 style={sectionSubhead}>{services.heading}</h3>
                    <h3 style={servicesText}>{services.subheading1}</h3>
                    <h3 style={servicesText}>{services.subheading2}</h3>
                    <h3 style={servicesText}>{services.subheading3}</h3>
                    <h3 style={servicesText}>{services.subheading4}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="home-section home-client-section"
          style={sectionContainer}
        >
          <div className="columns is-mobile is-vcentered">
            <div className="column is-2 has-text-centered home-section-mobile-padding">
              <h4 className="home-sideways-title-clients" style={sectionTitle}>
                {clients.title}
              </h4>
            </div>
            <div className="column is-9 has-text-centered">
              <h6 style={orangeHeaderText}>xx</h6>
              <h5 style={clientsTitle}>{clients.heading}</h5>
              <Carousel />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  hero: PropTypes.string,
  about: PropTypes.string,
  services: PropTypes.string,
  clients: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        hero={frontmatter.hero}
        about={frontmatter.about}
        services={frontmatter.services}
        clients={frontmatter.clients}
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
        hero {
          heading
          subheading
          description
        }
        about {
          heading
          subheading
          description1
          description2
        }
        services {
          title
          heading
          subheading1
          subheading2
          subheading3
          subheading4
        }
        clients {
          title
          heading
        }
      }
    }
  }
`
