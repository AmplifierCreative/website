import React, { useState, useRef, useEffect } from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Spring, useTrail, animated as a } from 'react-spring'

import logo from '../img/logo.svg'
import logoDark from '../img/logo-dk.svg'

/* const NavMenuSidebar = Keyframes.Spring({
  peek: { x: 500 },
  open: { x: 0, delay: 0 },
  close: { x: 500, delay: 600 },
})

const Menu = Keyframes.Trail({
  peek: { x: 500, display: 'none' },
  open: { x: 0, display: 'block' },
  close: { x: 500, display: 'none' },
}) */

const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    opacity: open ? 1 : 0,
    x: open ? 0 : 1000,
    from: { opacity: 0, x: 1000 },
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
  const [navBarActiveClass, setNavBarActiveClass] = useState('')
  const [open, setOpen] = useState(false)
  const [isTop, setIsTop] = useState(true)

  const wrapperRef = useRef()

  useEffect(() => {
    window.addEventListener('scroll', _.throttle(checkPosition, 100))
    window.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', _.throttle(checkPosition, 100))
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleHamburger = () => {
    setOpen((open) => !open)
    setActive((active) => !active)
    setNavBarActiveClass(active ? 'is-active' : '')
  }

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target) && active) {
      toggleHamburger()
    }
  }

  const _handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      toggleHamburger()
    }
    return
  }

  const checkPosition = () => {
    window.scrollY === 0 ? setIsTop(true) : setIsTop(false)
  }

  const { edges: posts } = data.allMarkdownRemark
  const items = posts[0].node.frontmatter.nav
  /*   const _state =
    state.open === undefined ? 'peek' : this.state.open ? 'open' : 'close' */

  return (
    <nav
      className={`nav-container `}
      role='navigation'
      aria-label='main-navigation'
      ref={wrapperRef}
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
          <div className='column is-relative'>
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
                <span className={`burger-line-top ${navBarActiveClass}`} />
                <span className={`burger-line middle ${navBarActiveClass}`} />
                <span className={`burger-line bottom ${navBarActiveClass}`} />
              </div>
            </div>
            <div className='navbar-menu-container'>
              <ul className={`menu-list has-text-right ${navBarActiveClass}`}>
                <Trail open={open}>
                  {items.map((item) => (
                    <li key={item.key}>
                      <Link to={`/${item.path}`} className='navbar-item'>
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </Trail>
                {/*                   <Menu
                    native
                    items={items}
                    keys={items.map((_, i) => i)}
                    reverse={!this.state.open}
                    state={_state}
                  >
                    {(item) => ({ x, ...props }) => (
                      <animated.li
                        style={{
                          transform: x.interpolate(
                            (x) => `translate3d(${x}%,0,0)`
                          ),
                          ...props,
                        }}
                      >
                        <Link to={`/${item.path}`} className='navbar-item'>
                          {item.text}
                        </Link>
                      </animated.li>
                    )}
                  </Menu> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Spring
        /* reverse={this.state.isTop} */
        from={{ height: 0 }}
        to={{ height: isTop ? 0 : 125 }}
      >
        {(props) => <div style={props} className='nav-background'></div>}
      </Spring>
      {/*         <NavMenuSidebar
          native
          state={_state}
          config={(config.default.friction = 20)}
        >
          {({ x }) => (
            <animated.div
              className='nav-menu-container'
              style={{
                transform: x.interpolate((x) => `translate3d(${x}%,0,0)`),
              }}
            ></animated.div>
          )}
        </NavMenuSidebar> */}
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
