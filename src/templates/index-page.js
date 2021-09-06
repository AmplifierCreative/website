import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import {
  useSpring,
  useTrail,
  useTransition,
  config,
  animated,
  useSpringRef,
  useChain,
} from 'react-spring'

import ReactFullpage from '@fullpage/react-fullpage'

import Layout from '../components/Layout'
import { FadeIn } from '../components/Utilities'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import SEO from '../components/Seo'

const headerStyle = {
  backgroundColor: '#2D2C2C',
}

// Check if window is defined (so if in the browser or in node.js).
const isBrowser = typeof window !== 'undefined'

const getWidth = () =>
  isBrowser
    ? window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    : null

function useCurrentWidth() {
  let [width, setWidth] = useState(getWidth())

  useEffect(() => {
    let timeoutId = null
    const resizeListener = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setWidth(getWidth()), 3000)
    }
    window.addEventListener('resize', resizeListener)

    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  return width
}

function ScrollPrompt() {
  const [show, set] = useState(false)
  const transitions = useTransition(show, {
    from: { scale: 1.15, y: -30, opacity: 0 },
    enter: { scale: 1, y: 0, opacity: 1 },
    leave: { scale: 1.15, y: -30, opacity: 0 },
    delay: 0,
    config: config.molasses,
    onRest: () => set(!show),
  })
  return transitions(
    (styles, item) =>
      item && (
        <animated.div
          style={{
            transform: 'rotate(45deg)',
            //visibility: hidden ? 'hidden' : 'unset',
            ...styles,
          }}
          className='arrow'
        ></animated.div>
      )
  )
}

const Trail = React.forwardRef((props, ref) => {
  const { welcome, children } = props
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: config.molasses,
    opacity: welcome ? 1 : 0,
    y: welcome ? 0 : 50,
    from: { opacity: 0, y: 50 },
    delay: 1000,
    ref: ref,
  })
  return (
    <>
      {trail.map(({ height, ...style }, index) => (
        <animated.div key={index} style={style}>
          <animated.div style={{ height }}>{items[index]}</animated.div>
        </animated.div>
      ))}
    </>
  )
})

export const IndexPageTemplate = ({ hero, about, services, clients, seo }) => {
  //Use custom hook to get current width of viewport
  let width = useCurrentWidth()

  //State that holds whether or not it is a mobile viewport
  const [isMobile, setIsMobile] = useState(false)

  const [intro, setIntro] = useState(false)
  const [welcome, setWelcome] = useState(false)

  //Refs for welcome animation
  const subheadingRef = useSpringRef()
  const arrowRef = useSpringRef()

  //react-spring animation props for welcome sequence
  const headingRef = useSpringRef()
  const heroHeaderProps = useSpring({
    to: {
      fontSize: welcome ? '50px' : isMobile ? '60px' : '136px',
      lineHeight: welcome ? '67px' : isMobile ? '50px' : '142px',
      opacity: 1,
    },
    from: { opacity: 0 },
    config: config.molasses,
    ref: headingRef,
    onRest: () => {
      if (!welcome) return
      setIntro(true)
    },
  })

  const drawnTextRef = useSpringRef()
  const dashProps = useSpring({
    from: { strokeDashoffset: 500 },
    to: { strokeDashoffset: 0 },
    ref: drawnTextRef,
    config: config.molasses,
  })

  const fillTextRef = useSpringRef()
  const fillProps = useSpring({
    from: { fill: '#2D2C2C' },
    to: { fill: '#F8F3F1' },
    ref: fillTextRef,
    config: config.molasses,
  })

  //orchestration of animation
  useChain(
    welcome
      ? [headingRef, subheadingRef, arrowRef]
      : [headingRef, drawnTextRef, fillTextRef, arrowRef],
    welcome ? [0, 0.1, 0.1] : [0, 0.5, 1, 0.5]
  )

  //Watches for changes in width, state of viewport is updated
  useEffect(() => {
    if (!width) return
    setIsMobile(!!(width <= 768))
  }, [width])

  //Timer to handle activating scroll for fullpage api
  useEffect(() => {
    if (intro) return
    //let timer = setTimeout(() => setWelcome(true), 10000)
    const _onKeyUp = (e) => {
      if (!e.key === 'ArrowDown' || !e.key === 'PageDown') return
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        setWelcome(true)
      }
    }

    const _onScroll = (e) => {
      if (e.cancelable) e.preventDefault()
      if (e.deltaY > 50) {
        setWelcome(true)
      }
    }

    const _onTouch = (e) => {
      if (e.cancelable) e.preventDefault()
      if (welcome) return
      setWelcome(true)
    }

    window.addEventListener('touchmove', _onTouch)
    window.addEventListener('wheel', _onScroll)
    window.addEventListener('keyup', _onKeyUp)
    return () => {
      window.removeEventListener('touchmove', _onScroll)
      window.removeEventListener('wheel', _onScroll)
      window.removeEventListener('keyup', _onKeyUp)
      //if (!!timer) clearTimeout(timer)
    }
  }, [intro])

  if (isMobile) {
    return (
      <main>
        <Helmet>
          <body className={welcome ? '' : 'index-intro-animation'} />
        </Helmet>
        <SEO
          title={seo.title}
          description={seo.description}
          image={seo.image.name}
        />
        <section
          style={
            hero.useImage
              ? {
                  backgroundImage: `url(${hero.image.publicURL})`,
                }
              : headerStyle
          }
          className='hero is-medium page-padding'
        >
          <div className='hero-body'>
            <div className='container is-max-widescreen'>
              {!welcome ? (
                <>
                  <animated.h1
                    className='home-header-text'
                    style={heroHeaderProps}
                    ref={headingRef}
                  >
                    Your new
                  </animated.h1>
                  <animated.svg
                    className='drawn-header'
                    style={dashProps}
                    ref={drawnTextRef}
                  >
                    <animated.text
                      className='drawn-header-text'
                      x='45'
                      y='45'
                      fontSize='60px'
                      fill='#F8F3F1'
                      style={fillProps}
                      ref={fillTextRef}
                    >
                      creative
                    </animated.text>
                  </animated.svg>
                  <animated.h1
                    className='home-header-text'
                    style={heroHeaderProps}
                  >
                    team has arrived
                  </animated.h1>
                </>
              ) : (
                <animated.h1
                  className='home-header-text'
                  style={heroHeaderProps}
                  ref={headingRef}
                >
                  {hero.heading}
                </animated.h1>
              )}
              {welcome && (
                <Trail welcome={welcome} ref={subheadingRef}>
                  <h2 className='hero-subheading-a'>{hero.subheading}</h2>
                  <h2 className='hero-subheading-a'>{hero.description}</h2>
                </Trail>
              )}
              <div className='arrow-container' style={{ position: 'absolute' }}>
                <ScrollPrompt />
              </div>
            </div>
          </div>
        </section>
        <div className='container home-page-container is-max-widescreen'>
          <FadeIn>
            <section className='section--gradient home-about-section home-section-container'>
              <div className='section'>
                <div className='columns is-vcentered'>
                  <div className='column is-6 has-text-centered home-section-mobile-padding'>
                    <div className='columns is-mobile'>
                      <div className='column'>
                        <span className='home-orange-header'>xx</span>
                        <h3 className='home-about-heading'>{about.heading}</h3>
                        <p className='home-section-subheading'>
                          {about.subheading}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='column is-6'>
                    <p className='first-letter-stroke home-about-description'>
                      {about.description1}
                    </p>
                    <p className='home-about-description home-about-margin'>
                      {about.description2}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>
          <FadeIn>
            <section className='home-section home-section-container'>
              <div className='section'>
                <div className='columns is-vcentered'>
                  <div className='column is-12 has-text-centered home-section-mobile-padding'>
                    <div className='columns is-mobile'>
                      <div className='column'>
                        <span className='home-orange-header'>xx</span>
                        <h3 className='home-section-subheading'>
                          {services.heading}
                        </h3>
                        <p className='home-services-description'>
                          {services.subheading1}
                        </p>
                        <p className='home-services-description'>
                          {services.subheading2}
                        </p>
                        <p className='home-services-description'>
                          {services.subheading3}
                        </p>
                        <p className='home-services-description'>
                          {services.subheading4}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>
          <FadeIn>
            <section className='home-section home-client-section home-section-container'>
              <div className='columns is-mobile is-vcentered'>
                <div className='column has-text-centered'>
                  <span className='home-orange-header'>xx</span>
                  <h3 className='home-client-heading'>{clients.heading}</h3>
                  <Carousel />
                </div>
              </div>
            </section>
          </FadeIn>
        </div>
      </main>
    )
  }
  return (
    <ReactFullpage
      //fullpage options
      licenseKey={'YOUR_KEY_HERE'}
      scrollingSpeed={1000}
      slidesNavigation={true}
      render={({ fullpageApi }) => {
        if (fullpageApi) fullpageApi.setAllowScrolling(intro)
        return (
          <ReactFullpage.Wrapper>
            <SEO
              title={seo.title}
              description={seo.description}
              image={seo.image.name}
            />
            <Helmet>
              <body className='home-page-style' />
            </Helmet>
            <section
              style={
                hero.useImage
                  ? {
                      backgroundImage: `url(${hero.image.publicURL})`,
                    }
                  : headerStyle
              }
              className='section'
            >
              <div className='container is-max-widescreen'>
                {!welcome ? (
                  <>
                    <animated.h1
                      className='home-header-text'
                      style={heroHeaderProps}
                      ref={headingRef}
                    >
                      Your new
                    </animated.h1>
                    <animated.svg
                      className='drawn-header'
                      style={dashProps}
                      ref={drawnTextRef}
                    >
                      <animated.text
                        className='drawn-header-text'
                        x='50'
                        y='90'
                        fontSize='136px'
                        fill='#F8F3F1'
                        style={fillProps}
                        ref={fillTextRef}
                      >
                        creative
                      </animated.text>
                    </animated.svg>
                    <animated.h1
                      className='home-header-text'
                      style={heroHeaderProps}
                    >
                      team has arrived
                    </animated.h1>
                  </>
                ) : (
                  <animated.h1
                    className='home-header-text'
                    style={heroHeaderProps}
                    ref={headingRef}
                  >
                    {hero.heading}
                  </animated.h1>
                )}
                {welcome && (
                  <Trail welcome={welcome} ref={subheadingRef}>
                    <h2 className='hero-subheading-a'>{hero.subheading}</h2>
                    <h2 className='hero-subheading-a'>{hero.description}</h2>
                  </Trail>
                )}
                <div className='arrow-container'>
                  <ScrollPrompt />
                </div>
              </div>
            </section>
            <section className='section'>
              <div className='container is-max-widescreen'>
                <div className='columns is-vcentered'>
                  <div className='column is-6 has-text-centered home-section-mobile-padding'>
                    <div className='columns is-mobile'>
                      <div className='column is-2 home-sideways-container'>
                        <span className='home-sideways-title about'>
                          {about.title}
                        </span>
                      </div>
                      <div className='column is-9'>
                        <span className='home-orange-header'>xx</span>
                        <h3 className='home-about-heading'>{about.heading}</h3>
                        <p className='home-section-subheading'>
                          {about.subheading}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='column is-6'>
                    <p className='first-letter-stroke home-about-description'>
                      {about.description1}
                    </p>
                    <p className='home-about-description home-about-margin'>
                      {about.description2}
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className='section'>
              <div className='container is-max-widescreen'>
                <div className='columns is-vcentered'>
                  <div className='column is-12 has-text-centered home-section-mobile-padding'>
                    <div className='columns is-mobile'>
                      <div className='column is-2 home-sideways-container'>
                        <span className='home-sideways-title services'>
                          {services.title}
                        </span>
                      </div>
                      <div className='column is-9'>
                        <span className='home-orange-header'>xx</span>
                        <h3 className='home-section-subheading'>
                          {services.heading}
                        </h3>
                        <p className='home-services-description'>
                          {services.subheading1}
                        </p>
                        <p className='home-services-description'>
                          {services.subheading2}
                        </p>
                        <p className='home-services-description'>
                          {services.subheading3}
                        </p>
                        <p className='home-services-description'>
                          {services.subheading4}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className='section'>
              <div className='container is-max-widescreen'>
                <div className='columns is-mobile is-vcentered'>
                  <div className='column is-2 has-text-centered home-section-mobile-padding home-sideways-container'>
                    <span className='home-sideways-title clients'>
                      {clients.title}
                    </span>
                  </div>
                  <div className='column is-9 has-text-centered'>
                    <span className='home-orange-header'>xx</span>
                    <h3 className='home-client-heading'>{clients.heading}</h3>
                    <Carousel />
                  </div>
                </div>
              </div>
            </section>
            <div className='section fp-auto-height'>
              <Footer />
            </div>
          </ReactFullpage.Wrapper>
        )
      }}
    />
  )
}

IndexPageTemplate.propTypes = {
  hero: PropTypes.shape({
    heading: PropTypes.string,
    subheading: PropTypes.string,
    description: PropTypes.string,
    useImage: PropTypes.string,
    image: PropTypes.object,
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
          useImage
          image {
            publicURL
          }
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
