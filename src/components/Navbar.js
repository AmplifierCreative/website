import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import { Keyframes, animated } from 'react-spring/renderprops'

import logo from '../img/logo.svg'
import logoDark from '../img/logo-dk.svg'


const NavMenuSidebar = Keyframes.Spring({
  peek: { x: 4000, delay: 800 },
  open: { delay: 0, x: 0 },
  close: { x: 4000, delay: 600 },
})

const Menu = Keyframes.Trail({
  peek: { x: 4000, display: 'none' },
  open: { x: 0, display: 'block' },
  close: { display: 'none', x: 4000 },
})
class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
      open: undefined,
      isTop: true
    }
/*     this.myRef = React.createRef()
    this.checkPosition.bind(this) */
  }

/*   componentDidMount() {
    const myRef = this.myRef
    myRef.addEventListener('scroll', this.checkPosition);
}

  componentWillUnmount() {
      const myRef = this.myRef
      myRef.removeEventListener('scroll', this.checkPosition);
  }
 */
 
  toggleHamburger = () => {
    this.setState(
      {
        active: !this.state.active,
        open: !this.state.open
      },
      () => {
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
            
          : this.setState({
              navBarActiveClass: '',
            })
      },
    )
  }   
  
  _handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      this.toggleHamburger()
    }
    return null
  }

/*   checkPosition = () => {
    const scrollY = window.scrollY
    const scrollTop = this.myRef.current.scrollTop
    console.log('check position called')
    console.log(`onScroll, window.scrollY: ${scrollY} myRef.scrollTop: ${scrollTop}`)
  } */
  
  render() {
    const state = this.state
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    const items = posts[0].node.frontmatter.nav
    const _state = 
      state.open === undefined
      ? 'peek' 
      : this.state.open
      ? 'open'
      : 'close'
    return (
      <nav
        className="nav-container"
        role="navigation"
        aria-label="main-navigation"
/*         ref={this.myRef}
        onScroll={this.checkPosition()} */
      >
        <div className="column navbar-container" >
          <div className="columns is-vcentered is-mobile">
            <div className="column is-one-third nav-logo logo-container" >
              <Link to="/" className="nav-logo-link" title="Logo">
                <img src={logo} alt="Amplifier Creative" className="nav-logo"/>
                <img
                  src={logoDark}
                  className="nav-logo-dk"
                  alt="Amplifier Creative"
                />
              </Link>
            </div>
            <div className="column is-relative">
              <div className="burger-container">
                <div
                  onClick={() => this.toggleHamburger()}
                  onKeyUp={(event) => this._handleKeyUp(event)}
                  className="burger"
                  role="button"
                  tabIndex={0}
                >
                  <span className={`burger-line-top ${this.state.navBarActiveClass}`} />
                  <span className={`burger-line ${this.state.navBarActiveClass}`} />
                  <span className={`burger-line ${this.state.navBarActiveClass}`} />
                </div>
              </div>
              <div className="navbar-menu">
                <ul className="menu-list has-text-right">
                  <Menu
                  native
                  items={items}
                  keys={items.map((_, i) => i)}
                  reverse={!this.state.open}
                  state={_state}>
                  {(item) => ({ x, ...props }) => (
                    <animated.div
                      style={{
                        transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                        ...props,
                      }}>
                      <li>
                        <Link to={`/${item.path}`} className="navbar-item">
                          {item.text}
                        </Link>
                      </li>
                    </animated.div>
                  )}
                </Menu>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <NavMenuSidebar native state={_state}>
          {({ x }) => (
              <animated.div
                className="nav-menu-container"
                style={{
                  transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                }}>
              </animated.div>
          )}
        </NavMenuSidebar>
      </nav>
    )
  }
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
