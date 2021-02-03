import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Keyframes, Spring, animated, config } from 'react-spring/renderprops'

import logo from '../img/logo.svg'
import logoDark from '../img/logo-dk.svg'


const NavMenuSidebar = Keyframes.Spring({
  peek: { x: 500 },
  open: { x: 0, delay: 0 },
  close: { x: 500, delay: 600 },
})

const Menu = Keyframes.Trail({
  peek: { x: 500, display: 'none' },
  open: { x: 0, display: 'block' },
  close: { x: 500, display: 'none' },
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
    this.checkPosition = this.checkPosition.bind(this)
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', _.throttle(this.checkPosition, 100));
    document.addEventListener('mousedown', this.handleClickOutside);
}

  componentWillUnmount() {
      document.removeEventListener('scroll', _.throttle(this.checkPosition, 100));
      document.removeEventListener('mousedown', this.handleClickOutside);
  }

 
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

  setWrapperRef(node) {
    this.wrapperRef = node;
  }


  handleClickOutside(event) {
    if (this.wrapperRef 
        && !this.wrapperRef.current.contains(event.target) 
        && this.state.active) 
        {
        this.toggleHamburger();
    }
}
  
  _handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      this.toggleHamburger()
    }
    return null
  }

  checkPosition = () => {
    window.scrollY === 0 ? this.setState({ isTop: true}) : this.setState({ isTop: false })
  }
  
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
        className={`nav-container `}
        role="navigation"
        aria-label="main-navigation"
        ref={this.wrapperRef}
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
              <div className="navbar-menu-container">
                <ul className={`menu-list has-text-right ${this.state.navBarActiveClass}`}>
                  <Menu
                  native
                  items={items}
                  keys={items.map((_, i) => i)}
                  reverse={!this.state.open}
                  state={_state}>
                  {(item) => ({ x, ...props }) => (
                    <animated.li
                      style={{
                        transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                        ...props,
                      }}>
                      <Link to={`/${item.path}`} className="navbar-item">
                        {item.text}
                      </Link>
                    </animated.li>
                  )}
                </Menu>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Spring
            /* reverse={this.state.isTop} */
            from={{ height: 0  }}
            to={{ height: this.state.isTop ? 0 : 125 }}
            >
            {props => <div style={props} className="nav-background"></div>}
        </Spring>
        <NavMenuSidebar native state={_state} config={config.default.friction = 20} >
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
