import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { useChain, useSpring, useTrail, config, animated } from 'react-spring'


import Layout from '../components/Layout'
import { FadeIn } from '../components/Utilities'
import Carousel from '../components/Carousel'
import SEO from '../components/Seo'

const headerStyle = {
  backgroundColor: '#2D2C2C',
}

function Trail({ trailProps, children }) {
  const items = React.Children.toArray(children)
  return (
      <React.Fragment>
        {trailProps.map(({ x, ...rest }, index) => (
          <animated.div
            key={items[index]}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate((x) => `translate3d(0,${x}px,0)`) }}>
            {items[index]}
          </animated.div>
        ))}
      </React.Fragment>
  )
}

export const IndexPageTemplate = ({
  hero,
  about,
  services,
  clients,
  seo
}) => {
  const headerRef = useRef()
  const heroRef = useRef()
  const trailRef = useRef()
  const arrowRef = useRef()

  const heroContainerProps = useSpring({ 
    to: {height: '90vh'}, 
    from: {height: '100vh'}, 
    config: config.molasses, 
    ref: heroRef 
  })

  const heroHeaderProps = useSpring({ 
    to: {opacity: 1}, 
    from: {opacity: 0}, 
    config: config.molasses, 
    ref: headerRef 
  })

  const trail = useTrail(2, {
    config: config.molasses,
    opacity: 1,
    x: 20,
    from: { opacity: 0, x: 20 },
    ref: trailRef,
  })

  const arrowProps = useSpring({ 
    to: async (next, cancel) => {
      await next({opacity: 1})
    },
    from: {opacity: 0}, 
    config: config.stiff, 
    ref: arrowRef 
  })

  useChain([headerRef, trailRef, heroRef, arrowRef])

  return (
    <div>
      <SEO 
        title={seo.title}
        description={seo.description}
        image={seo.image.name}
      />
      <Helmet>
        <body className="index-intro-animation" />
      </Helmet>
      <animated.section
      style={ hero.image ?
        {backgroundImage: `url(${
          !!hero.image.childImageSharp ? hero.image.childImageSharp.fluid.src : hero.image
        })`} : Object.assign(heroContainerProps, headerStyle)
      }
      className="hero is-medium page-padding">
        <div className="hero-body">
          <div className="container is-max-widescreen">
            <animated.h1 className="home-header-text" style={heroHeaderProps}>
              {hero.heading}
            </animated.h1>
            <Trail trailProps={trail}>
              <h2 className="hero-subheading-a">
                {hero.subheading}
              </h2>
              <h2 className="hero-subheading-a">
                {hero.description}
              </h2>
            </Trail>
          </div>
          <div className="arrow-container">
            <animated.div style={arrowProps} className="arrow"></animated.div>
          </div>  
        </div> 
      </animated.section>
      <div className="container home-page-container is-max-widescreen">
        <FadeIn>
        <section
          className="section--gradient home-about-section home-section-container"
        >
          <div className="section">
            <div className="columns is-vcentered">
              <div className="column is-6 has-text-centered home-section-mobile-padding">
                <div className="columns is-mobile">
                  <div className="column is-2">
                    <h4
                      className="home-sideways-title about"
                    >
                      {about.title}
                    </h4>
                  </div>
                  <div className="column is-9">
                    <h6 className='home-orange-header' >xx</h6>
                    <h2 className="home-about-heading">{about.heading}</h2>
                    <h3 className="home-section-subheading" >{about.subheading}</h3>
                  </div>
                </div>
              </div>
              <div className="column is-6">
                <p className="first-letter-stroke home-about-description" >
                  {about.description1}
                </p>
                <p className="home-about-description home-about-margin" >{about.description2}</p>
              </div>
            </div>
          </div>
        </section>
        </FadeIn>
        <FadeIn>
        <section className="home-section home-section-container">
          <div className="section">
            <div className="columns is-vcentered">
              <div className="column is-12 has-text-centered home-section-mobile-padding">
                <div className="columns is-mobile">
                  <div className="column is-2">
                    <h4
                      className="home-sideways-title services"
                    >
                      {services.title}
                    </h4>
                  </div>
                  <div className="column is-9">
                    <h6 className="home-orange-header">xx</h6>
                    <h3 className="home-section-subheading" >{services.heading}</h3>
                    <h3 className="home-services-description">{services.subheading1}</h3>
                    <h3 className="home-services-description">{services.subheading2}</h3>
                    <h3 className="home-services-description">{services.subheading3}</h3>
                    <h3 className="home-services-description">{services.subheading4}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </FadeIn>
        <FadeIn>
        <section
          className="home-section home-client-section home-section-container"
        >
          <div className="columns is-mobile is-vcentered">
            <div className="column is-2 has-text-centered home-section-mobile-padding">
              <h4 className="home-sideways-title clients">
                {clients.title}
              </h4>
            </div>
            <div className="column is-9 has-text-centered">
              <h6 className="home-orange-header">xx</h6>
              <h5 className="home-client-heading">{clients.heading}</h5>
              <Carousel />
            </div>
          </div>
        </section>
        </FadeIn>
      </div>
    </div>
  )
}

IndexPageTemplate.propTypes = {
  hero: PropTypes.object,
  about: PropTypes.object,
  services: PropTypes.object,
  clients: PropTypes.object,
  seo: PropTypes.object,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        hero={frontmatter.hero}
        about={frontmatter.about}
        services={frontmatter.services}
        clients={frontmatter.clients}
        seo={frontmatter.seo}
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
        hero {
          heading
          subheading
          description
          
        }
        about {
          title
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
        seo {
          title
          description
          image {
            name
          }
        }
      }
    }
  }
`
