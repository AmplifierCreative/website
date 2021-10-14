import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useSpring, useTrail, animated as a } from 'react-spring'

import logo from '../img/logo.svg'
import logoDark from '../img/logo-dk.svg'

const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    opacity: open ? 1 : 0,
    x: open ? 0 : 1000,
    from: { opacity: open ? 1 : 0, x: 1000 },
    config: { friction: open ? 24 : 16 },
    reset: open,
    reverse: !open,
  })
  return (
    <>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </>
  )
}

export const Navbar = ({ data }) => {
  const [active, setActive] = useState(false)
  const [navbaractivity, setNavbaracitivty] = useState(true)
  const [open, setOpen] = useState(false)
  const [isTop, setIsTop] = useState(true)

  const wrapperRef = useRef()

  useEffect(() => {
    let navMenuTimer
    if (!active) {
      navMenuTimer = setTimeout(() => setNavbaracitivty(true), 700)
    }
    if (active) {
      if (navMenuTimer) clearTimeout(navMenuTimer)
      setNavbaracitivty(false)
    }
    return () => {
      if (navMenuTimer) clearTimeout(navMenuTimer)
    }
  }, [active])

  const toggleHamburger = useCallback(() => {
    setOpen((o) => !o)
    setActive((a) => !a)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef && !wrapperRef.current.contains(event.target) && active) {
        toggleHamburger()
      }
    }

    const checkPosition = () => {
      window.scrollY === 0 ? setIsTop(true) : setIsTop(false)
    }

    const throttleFunc = () => _.throttle(checkPosition, 200)

    window.addEventListener('scroll', throttleFunc())
    window.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', throttleFunc())
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [active, toggleHamburger])

  const navBackground = useSpring({ height: isTop ? 0 : 125 })
  const navMenuBackground = useSpring({
    x: open ? 0 : 1000,
    config: { friction: open ? 20 : 30, clamp: true },
    delay: open ? 0 : 600,
  })

  const _handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      toggleHamburger()
    }
    return
  }

  const { edges: posts } = data.allMarkdownRemark
  const items = posts[0].node.frontmatter.nav
  const navbarToggleFunction = navbaractivity ? '' : 'is-active'

  return (
    <nav
      className={`nav-container `}
      role='navigation'
      aria-label='main-navigation'
    >
      <div className='column navbar-container'>
        <div className='columns is-vcentered is-mobile'>
          <div className='column is-one-third nav-logo logo-container'>
            <Link to='/' className='nav-logo-link' title='Logo'>
              <img src={logo} alt='Amplifier Creative' className='nav-logo' />
              <img
                src={logoDark}
                className='nav-logo-dk'
                alt='Amplifier Creative'
              />
            </Link>
          </div>
          <div className='column is-relative' ref={wrapperRef}>
            <div className='burger-container'>
              <div
                onClick={() => toggleHamburger()}
                onKeyUp={(event) => _handleKeyUp(event)}
                className='burger'
                role='button'
                aria-label='button'
                aria-pressed='false'
                tabIndex={0}
              >
                <span className={`burger-line-top ${navbarToggleFunction}`} />
                <span
                  className={`burger-line middle ${navbarToggleFunction}`}
                />
                <span
                  className={`burger-line bottom ${navbarToggleFunction}`}
                />
              </div>
            </div>
            <div className='navbar-menu-container'>
              <ul
                className={`menu-list has-text-right ${navbarToggleFunction}`}
              >
                <Trail open={open}>
                  {items.map((item) => (
                    <li key={item.key}>
                      <Link to={`/${item.path}`} className='navbar-item'>
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </Trail>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <a.div style={navBackground} className='nav-background'></a.div>
      <a.div style={navMenuBackground} className='nav-menu-container'></a.div>
    </nav>
  )
}

Navbar.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query NavbarQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "global-page" } } }
        ) {
          edges {
            node {
              frontmatter {
                templateKey
                nav {
                  text
                  path
                  local
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => <Navbar data={data} />}
  />
)
