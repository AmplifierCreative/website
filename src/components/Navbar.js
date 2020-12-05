import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'
import logoDark from '../img/logo-dk.svg'

const nav = {
  margin: '0',
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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
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
  zIndex: 1,
}

const navMenuContainerMobile = {
  padding: 0,
  margin: 0,
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  width: '65%',
  overflow: 'auto',
  backgroundColor: '#F8F3F1',
  zIndex: 1,
}

const navMenu = {
  position: 'absolute',
  right: '13px',
  zIndex: '99',
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
const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
      isMobile: '',
    };
    this.updateSize = this.updateSize.bind(this);
  }

  componentDidMount() {
    this.updateSize();
    window.addEventListener("resize", this.updateSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSize);
  }

  updateSize() {
    this.setState({ isMobile: window.innerWidth < 769 });
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
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

  render() {
    const isMobile= this.state.isMobile;

    return (
      <nav
        className="columns nav-container"
        role="navigation"
        ariaLabel="main-navigation"
        style={nav}
      >
        <div className="column" style={isMobile ? navBarContainerMobile : navBarContainer}>
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
            <div className="column " style={toggleContainer}>
              <div style={burgerContainer}>
                <div
                  onClick={() => this.toggleHamburger()}
                  style={burger}
                  className={'burger'}
                  role="button"
                  tabIndex="1"
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
                    <ul class="menu-list has-text-right">
                      <li>
                        <Link
                          className="navbar-item"
                          to="/about"
                          style={navItem}
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="navbar-item"
                          to="/projects"
                          style={navItem}
                        >
                          Portfolio
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="navbar-item"
                          to="/services"
                          style={navItem}
                        >
                          Services
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="navbar-item"
                          to="/blog"
                          style={navItem}
                        >
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="navbar-item"
                          to="/contact"
                          style={navItem}
                        >
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {this.state.active ? (
          <div className="nav-menu-container" style={isMobile ? navMenuContainerMobile : navMenuContainer}></div>
        ) : null}
      </nav>
    )
  }
}

export default Navbar
