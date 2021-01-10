import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

import logo from '../img/logo.svg'
import logoDark from '../img/logo-dk.svg'


const nav = {
  margin: '0',
  width: '100%',
  zIndex: '99',
  position: 'sticky',
  top: '0',
}

const navBarContainer = {
  maxWidth: '1240px',
  margin: 'auto',
}

const navBarContainerMobile = {
  paddingRight: '2em',
  paddingLeft: '2em',
}

const logoContainer = {
  backgroundColor: 'transparent',
  padding: '0',
  paddingTop: '4rem',
}

const logoContainerMobile = {
  backgroundColor: 'transparent',
  padding: '0',
  paddingTop: '4rem',
  width: '51%',
}

const logoStyle = {
  marginLeft: '-6px',
}

const logoDarkStyle = {
  display: 'none',
  marginLeft: '-6px',
}

const toggleContainer = {
  position: 'relative',
}

const burgerContainer = {
  backgroundColor: 'transparent',
  paddingTop: '4rem',
  paddingBottom: '.25em',
}

const burger = {
  float: 'right',
  zIndex: '1000',
  position: 'relative',
  cursor: 'pointer',
}

const burgerLineTop = {
  height: '8px',
  width: '70px',
  display: 'block',
}

const burgerLine = {
  height: '8px',
  width: '70px',
  display: 'block',
  marginTop: '8px',
}

const navMenuContainer = {
  padding: 0,
  margin: 0,
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  width: '38%',
  overflow: 'auto',
  backgroundColor: '#F8F3F1',
  zIndex: 100,
}

const navMenuContainerMobile = {
  padding: 0,
  margin: 0,
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  width: '85%',
  overflow: 'auto',
  backgroundColor: '#F8F3F1',
  zIndex: 100,
}

const navMenu = {
  position: 'absolute',
  right: '13px',
  zIndex: '999',
  paddingTop: '3em',
}

const navItem = {
  color: '#BA5930',
  fontSize: '2.5em',
  fontWeight: '800',
  padding: '0',
  lineHeight: '1.5em',
  letterSpacing: '1px',
}

const NavLinksMenu = ({ links }) => {
  return links.map((link) => {
    const { path, text, local } = link

    if (local) {
      return (
        <li key={v4()}>
          <Link to={`/${link.path}`} className="navbar-item" style={navItem}>
            {link.text}
          </Link>
        </li>
      )
    }

    if (!local) {
      return (
        <li>
          <a href={path} className="footer-item" style={navItem}>
            {text}
          </a>
        </li>
      )
    }
    return null
  })
}
class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
      isMobile: '',
    }
    this.updateSize = this.updateSize.bind(this)
  }

  componentDidMount() {
    this.updateSize()
    window.addEventListener('resize', this.updateSize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize)
  }

  updateSize() {
    this.setState({ isMobile: window.innerWidth < 769 })
  }

  toggleHamburger = () => {
    this.setState(
      {
        active: !this.state.active,
      },
      () => {
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  _handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      this.toggleHamburger()
    }
    return null
  }

  render() {
    const isMobile = this.state.isMobile

    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <nav
        className="columns nav-container"
        role="navigation"
        aria-label="main-navigation"
        style={nav}
      >
        <div
          className="column"
          style={isMobile ? navBarContainerMobile : navBarContainer}
        >
          <div className="columns is-vcentered is-mobile">
            <div
              className="column is-one-third nav-logo"
              style={isMobile ? logoContainerMobile : logoContainer}
            >
              <Link to="/" className="nav-logo-link" title="Logo">
                <img src={logo} alt="Amplifier Creative" style={logoStyle} />
                <img
                  src={logoDark}
                  alt="Amplifier Creative"
                  style={logoDarkStyle}
                />
              </Link>
            </div>
            <div className="column" style={toggleContainer}>
              <div style={burgerContainer}>
                <div
                  onClick={() => this.toggleHamburger()}
                  onKeyUp={(event) => this._handleKeyUp(event)}
                  style={burger}
                  className={'burger'}
                  role="button"
                  tabIndex={0}
                >
                  <span
                    className={`burger-line ${this.state.navBarActiveClass}`}
                    style={burgerLineTop}
                  />
                  <span
                    className={`burger-line ${this.state.navBarActiveClass}`}
                    style={burgerLine}
                  />
                  <span
                    className={`burger-line ${this.state.navBarActiveClass}`}
                    style={burgerLine}
                  />
                </div>
              </div>
              {this.state.active ? (
                <div
                  id="navMenu"
                  className={`navbar-menu ${this.state.navBarActiveClass}`}
                  style={navMenu}
                >
                  <div>
                    <ul className="menu-list has-text-right">
                      <NavLinksMenu links={posts[0].node.frontmatter.nav} />
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {this.state.active ? (
          <div
            className="nav-menu-container"
            style={isMobile ? navMenuContainerMobile : navMenuContainer}
          ></div>
        ) : null}
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
