import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { useSpring, useTrail, config, animated } from 'react-spring'

import Layout from '../components/Layout'
import { FadeIn } from '../components/Utilities'
import Carousel from '../components/Carousel'
import SEO from '../components/Seo'

const headerStyle = {
  backgroundColor: '#2D2C2C',
}

const fixedBackground = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100vh',
  zIndex: '0',
}

function Trail({ trailProps, children }) {
  const items = React.Children.toArray(children)
  return (
    <React.Fragment>
      {trailProps.map(({ x, ...rest }, index) => (
        <animated.div
          key={items[index]}
          className="trails-text"
          style={{
            ...rest,
            transform: x.interpolate((x) => `translate3d(0,${x}px,0)`),
          }}
        >
          {items[index]}
        </animated.div>
      ))}
    </React.Fragment>
  )
}

const scrollConfig = {behavior: "smooth", block: "start", inline: "nearest"}

export const IndexPageTemplate = ({
  image,
  hero,
  about,
  services,
  clients,
  seo,
}) => {

  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false)

  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();
  const fourthRef = useRef();

  const heroContainerProps = useSpring({
    to: { height: '90vh' },
    from: { height: '100vh' },
    config: config.molasses,
  })

  const heroHeaderProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: config.molasses,
  })

  const trail = useTrail(2, {
    config: config.molasses,
    opacity: 1,
    x: 20,
    from: { opacity: 0, x: 20 },
  })


  useEffect(() => {
		
    let timer = setTimeout(() => setShow(true), 500);

    const _onKeyUp = e => {
      console.log(e.key)
      if (!e.key === 'ArrowDown' || !e.key ===  'ArrowUp'|| !e.key ===  'PageUp' || !e.key ===  'PageDown') return
      if (!show) return 
      setShow(false)
      if (e.key === 'ArrowUp' || e.key ===  'PageUp') {
        if (index === 0) return 
        setIndex(index => index - 1)
      }
      if (e.key === 'ArrowDown' || e.key ===  'PageDown') {
        if (index === 3) return 
        setIndex(index => index + 1)
      }
    }

    const _onScroll = e => { 
      if (!show) return 
      setShow(false)
      if (e.deltaY < 0) {
        if (index === 0) return 
        setIndex(index => index - 1)  
      }     
      if (e.deltaY > 0) {
        if (index === 3) return
        setIndex(index => index + 1)
      }  
    }

    const showSlide = () => {  
      console.log(index)  
      switch (index) {
      case 0:
        firstRef.current.scrollIntoView(scrollConfig)
        break;
      case 1:
        secondRef.current.scrollIntoView(scrollConfig)
        break;
      case 2:
        thirdRef.current.scrollIntoView(scrollConfig) 
        break;
      case 3:
        fourthRef.current.scrollIntoView(scrollConfig) 
        break;
      default:
        return
      }
    }

    showSlide();
    window.addEventListener("wheel", _onScroll);
    window.addEventListener("keyup", _onKeyUp);
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener("wheel", _onScroll)
      window.removeEventListener("keyup", _onKeyUp)
      
    };
  }, [ index, show ]);

  const getClass = () => {
    switch (index) {
      case 1:
        return "circle-img"
      case 2:
        return "line"
      case 3:
        return "arrow-img" 
      default:
        return null
      }
  }

  return (
    <div>
      { index < 3 &&
        <Helmet>
          <html lang="en" className="index-intro-animation" />
        </Helmet>
      }
      <SEO
        title={seo.title}
        description={seo.description}
        image={seo.image.name}
      />
      <div style={fixedBackground}>
        <div className={`home-fixed ${getClass()}`}></div>
      </div>
      <section
        ref={firstRef}
        style={
          image
            ? {
                backgroundImage: `url(${
                  !!image.childImageSharp
                    ? image.childImageSharp.fluid.src
                    : image
                })`,
              }
            : Object.assign(heroContainerProps, headerStyle)
        }
        className={`hero is-medium page-padding hero-slide active`}
      >
        <div className="hero-body">
          <div className="container is-max-widescreen">
            <animated.h1 className="home-header-text" style={heroHeaderProps}>
              {hero.heading}
            </animated.h1>
            <Trail trailProps={trail}>
              <h2 className="hero-subheading-a">{hero.subheading}</h2>
              <h2 className="hero-subheading-a">{hero.description}</h2>
            </Trail>
          </div>
          <div className="arrow-container">
            <div className="arrow"></div>
          </div>
        </div>
      </section>
      <div className="container home-page-container is-max-widescreen">
        <FadeIn>
          <section className="section--gradient home-about-section home-section-container" ref={secondRef}>
            <div className="section">
              <div className="columns is-vcentered">
                <div className="column is-6 has-text-centered home-section-mobile-padding">
                  <div className="columns is-mobile">
                    <div className="column is-2">
                      <h4 className="home-sideways-title about">
                        {about.title}
                      </h4>
                    </div>
                    <div className="column is-9">
                      <h6 className="home-orange-header">xx</h6>
                      <h2 className="home-about-heading">{about.heading}</h2>
                      <h3 className="home-section-subheading">
                        {about.subheading}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="column is-6">
                  <p className="first-letter-stroke home-about-description">
                    {about.description1}
                  </p>
                  <p className="home-about-description home-about-margin">
                    {about.description2}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
        <FadeIn>
          <section className="home-section home-section-container" ref={thirdRef}>
            <div className="section">
              <div className="columns is-vcentered">
                <div className="column is-12 has-text-centered home-section-mobile-padding">
                  <div className="columns is-mobile">
                    <div className="column is-2">
                      <h4 className="home-sideways-title services">
                        {services.title}
                      </h4>
                    </div>
                    <div className="column is-9">
                      <h6 className="home-orange-header">xx</h6>
                      <h3 className="home-section-subheading">
                        {services.heading}
                      </h3>
                      <h3 className="home-services-description">
                        {services.subheading1}
                      </h3>
                      <h3 className="home-services-description">
                        {services.subheading2}
                      </h3>
                      <h3 className="home-services-description">
                        {services.subheading3}
                      </h3>
                      <h3 className="home-services-description">
                        {services.subheading4}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
        <FadeIn>
          <section className="home-section home-client-section home-section-container" ref={fourthRef}>
            <div className="columns is-mobile is-vcentered">
              <div className="column is-2 has-text-centered home-section-mobile-padding">
                <h4 className="home-sideways-title clients">{clients.title}</h4>
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
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  hero: PropTypes.shape({
    heading: PropTypes.string,
    subheading: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
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
        image={frontmatter.image}
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
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
          publicURL
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
        hero {
          heading
          subheading
          description
        }
        seo {
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
