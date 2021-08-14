import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import {
  useSpring,
  useTrail,
  useChain,
  useTransition,
  config,
  animated,
  useSpringRef,
} from 'react-spring'

import Layout from '../components/Layout'
import { FadeIn } from '../components/Utilities'
import Carousel from '../components/Carousel'
import SEO from '../components/Seo'

const headerStyle = {
  backgroundColor: '#2D2C2C',
}

function getClass(i) {
  switch (i) {
    case 1:
      return 'circle-img'
    case 2:
      return 'line'
    case 3:
      return 'arrow-img'
    default:
      return null
  }
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

function ScrollPrompt({ hidden }) {
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
            visibility: hidden ? 'hidden' : 'unset',
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

/* function lineStyle(ref) {
  let location =
    ref && ref.current ? ref.current.getBoundingClientRect() : undefined
  let locationY = location ? location.y : '375'
  let locationX = location ? location.x : '551'

  const getTop = () => {
    
    return locationY + 'px'
  }

  const getLeft = () => {
    return locationX + 'px'
  }

  const style = {
    top: getTop(),
    left: getLeft(),
  }
  return style
} */

export const IndexPageTemplate = ({ hero, about, services, clients, seo }) => {
  const [index, setIndex] = useState(-1)
  const [show, setShow] = useState(true)
  const [welcome, setWelcome] = useState(false)
  const [touching, setTouching] = useState(false)

  //Refs for scroll anchors
  const zeroRef = useRef()
  const firstRef = useRef()
  const secondRef = useRef()
  const thirdRef = useRef()
  const fourthRef = useRef()

  //Touch event handler state
  const [firstTouch, setFirstTouch] = useState(0)
  const [lastTouch, setLastTouch] = useState(0)
  const [touchLength, setTouchLength] = useState(0)

  //Refs for backgroundPositions
  const aboutRef = useRef()

  //Refs for welcome animation
  const headingRef = useSpringRef()
  const subheadingRef = useSpringRef()
  const arrowRef = useSpringRef()

  //Use custom hook to get current width of viewport
  let width = useCurrentWidth()

  //State that holds whether or not it is a mobile viewport
  const [isMobile, setIsMobile] = useState(false)

  //Watches for changes in width, state of viewport is updated
  useEffect(() => {
    if (!width) return
    setIsMobile(!!(width < 768))
  }, [width])

  let scrollConfig = isMobile
    ? true
    : { behavior: 'smooth', block: 'start', inline: 'nearest' }

  //react-spring animation props for welcome sequence
  const heroHeaderProps = useSpring({
    to: {
      fontSize: welcome ? '50px' : isMobile ? '69px' : '136px',
      lineHeight: welcome ? '67px' : isMobile ? '72px' : '142px',
      opacity: 1,
    },
    from: { opacity: 0 },
    config: config.molasses,
    ref: headingRef,
  })

  //orchestration of animation
  useChain(
    welcome ? [headingRef, subheadingRef, arrowRef] : [headingRef, arrowRef]
  )

  //Used for dev, reset the page on reload
  const checkIfScrolledCorrectly = () => {
    const view = zeroRef.current.getBoundingClientRect()
    const inView = Math.floor(view.top) === 0
    return inView ? null : zeroRef.current.scrollIntoView(scrollConfig)
  }

  //Initialize timer state
  const [indexTimer, setIndexTimer] = useState()

  //Timer used to debounce updateIndex
  useEffect(() => {
    let timer = setTimeout(() => setIndexTimer(true), 500)
    return () => {
      clearTimeout(timer)
    }
  }, [indexTimer])

  //Function to change the index
  const updateIndex = (i) => {
    setIndexTimer(false)
    if (!indexTimer) return
    if (index > 4) {
      setIndex(4)
    }
    if (index < -1) {
      setIndex(0)
    }
    switch (i) {
      case 'increment':
        if (index === 4) return
        setIndex((index) => index + 1)
        break
      case 'decrement':
        if (index === 0) return
        setIndex((index) => index - 1)
        break
      default:
        return undefined
    }
  }

  //State listeners and event handlers for scroll jacking
  useEffect(() => {
    const _onKeyUp = (e) => {
      if (
        !e.key === 'ArrowDown' ||
        !e.key === 'ArrowUp' ||
        !e.key === 'PageUp' ||
        !e.key === 'PageDown'
      )
        return
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        updateIndex('decrement')
      }
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        updateIndex('increment')
      }
    }

    const _onScroll = (e) => {
      if (e.cancelable) e.preventDefault()
      if (!indexTimer) return
      if (e.deltaY < -50) {
        updateIndex('decrement')
      }
      if (e.deltaY > 50) {
        updateIndex('increment')
      }
    }

    window.addEventListener('wheel', _onScroll)
    window.addEventListener('keyup', _onKeyUp)
    return () => {
      window.removeEventListener('wheel', _onScroll)
      window.removeEventListener('keyup', _onKeyUp)
    }
  }, [updateIndex, show])

  //Index listener, once index is updated, this effect is triggerd
  useEffect(() => {
    console.log('current index: ', index, 'current width: ', width)
    switch (index) {
      case -1:
        setTimeout(() => checkIfScrolledCorrectly(), 600)
        break
      case 0:
        setWelcome(true)
        if (isMobile) return
        zeroRef.current.scrollIntoView(scrollConfig)
        break
      case 1:
        if (isMobile) return
        firstRef.current.scrollIntoView(scrollConfig)
        break
      case 2:
        if (isMobile) return
        secondRef.current.scrollIntoView(scrollConfig)
        break
      case 3:
        if (isMobile) return
        thirdRef.current.scrollIntoView(scrollConfig)
        break
      case 4:
        if (isMobile) return
        fourthRef.current.scrollIntoView(scrollConfig)
        break
      default:
        return
    }
  }, [index])

  //Set up touch listeners
  const _touchStart = (e) => {
    if (isMobile) return
    if (e.type.includes('mouse')) return
    if (touching) return
    setTouching(true)
    let startTouch = parseInt(e.changedTouches[0].pageY)
    setFirstTouch(startTouch)
  }

  const _touchEnd = (e) => {
    if (isMobile) return
    if (e.type.includes('mouse')) return
    let endTouch = parseInt(e.changedTouches[0].pageY)
    const touchDistance = endTouch - firstTouch
    console.log('touch distance', touchDistance)
    setTouching(false)
    //e.preventDefault()
    if (touchDistance > 10) updateIndex('decrement')
    if (touchDistance < -10) updateIndex('increment')
  }

  //Memoize state and pass it as props to children
  /*   const memoizedLocation = useCallback(() => {
  switch (index) {
    case 1:
      return firstRef
    case 2:
      return secondRef
    case 3:
      return thirdRef
    case 4:
      return fourthRef
    default:
      return undefined
  }
}, [index]) */

  const circleStyle = () => {
    let reference = aboutRef.current
    let children = !!reference ? Array.from(reference?.children) : null
    const topSetting = !!reference
      ? //children[0].offsetHeight +
        children[1].offsetHeight +
        children[2].offsetHeight +
        children[3].offsetHeight
      : '420px'
    console.log(topSetting)
    const leftSetting = !!reference ? children[0].offsetHeight : '110px'
    const style = { top: topSetting, left: leftSetting }
    return style
  }

  return (
    <main onTouchStart={_touchStart} onTouchEnd={_touchEnd}>
      <Helmet>
        <html lang='en' className={isMobile ? '' : 'index-intro-animation'} />
      </Helmet>
      <SEO
        title={seo.title}
        description={seo.description}
        image={seo.image.name}
      />
      {/* <div
        style={lineStyle(memoizedLocation)}
        className={`home-fixed ${getClass(memoizedLocation)}`}
      ></div> */}
      <section
        ref={zeroRef}
        style={
          hero.useImage
            ? {
                backgroundImage: `url(${hero.image.publicURL})`,
              }
            : headerStyle
        }
        className={`hero is-medium page-padding hero-slide active`}
      >
        <div className='hero-body'>
          <div className='container is-max-widescreen'>
            <animated.h1
              className='home-header-text'
              style={heroHeaderProps}
              ref={headingRef}
            >
              {hero.heading}
            </animated.h1>
            {welcome && (
              <Trail welcome={welcome} ref={subheadingRef}>
                <h2 className='hero-subheading-a'>{hero.subheading}</h2>
                <h2 className='hero-subheading-a'>{hero.description}</h2>
              </Trail>
            )}
          </div>
          <div className='arrow-container'>
            {welcome ? <ScrollPrompt /> : <ScrollPrompt />}
          </div>
        </div>
      </section>
      <div className='container home-page-container is-max-widescreen'>
        <FadeIn>
          <section
            className='section--gradient home-about-section home-section-container'
            ref={firstRef}
          >
            <div className='section'>
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
                      <h3 className='home-about-heading' ref={aboutRef}>
                        {about.heading}
                      </h3>
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
          <section
            className='home-section home-section-container'
            ref={secondRef}
          >
            <div className='section'>
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
        </FadeIn>
        <FadeIn>
          <section
            className='home-section home-client-section home-section-container'
            ref={thirdRef}
          >
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
          </section>
        </FadeIn>
        <div ref={fourthRef}></div>
      </div>
    </main>
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
