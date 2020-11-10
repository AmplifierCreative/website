import React from 'react'
import { Link } from 'gatsby'
import styles from './all.sass'
import logo from '../img/logo.svg'

const logoStyle = {
  height: '50px',
  width: 'auto',
  margin: '2rem',
}

const navItem = {
  color: '#BA5930',
  fontSize: '3rem',
  fontWeight: '800',
}

const burgerPadding = {
  padding: '0 2.75em',
}

const burgerLine = {
  height: '10px',
  width: '81px',
  display: 'block',
  backgroundColor: '#BA5930',
  margin: '8px 0',
}

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
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
    return (
      <nav className="navbar" role="navigation" aria-label="main-navigation">
        <div
          className="navbar-brand"
          role="navigation"
          ariaLabel="main navigation"
        >
          <Link to="/" className="navbar-item" title="Logo">
            <img src={logo} alt="Amplifier Creative" style={logoStyle} />
          </Link>
          {/* Hamburger menu */}
          <div
            className={`navbar-burger burger ${this.state.navBarActiveClass}`}
            data-target="navMenu"
            onClick={() => this.toggleHamburger()}
            style={burgerPadding}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div
          id="navMenu"
          className={`navbar-menu ${this.state.navBarActiveClass}`}
        >
          <div className="navbar-end">
            <ul class="menu-list has-text-right">
              <li>
                <Link className="navbar-item" to="/about" style={navItem}>
                  About
                </Link>
              </li>
              <li>
                <Link className="navbar-item" to="/portfolio" style={navItem}>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link className="navbar-item" to="/services" style={navItem}>
                  Services
                </Link>
              </li>
              <li>
                <Link className="navbar-item" to="/blog" style={navItem}>
                  Blog
                </Link>
              </li>
              <li>
                <Link className="navbar-item" to="/contact" style={navItem}>
                  Contact
                </Link>
              </li>
              <li>
                <Link className="navbar-item" to="/projects" style={navItem}>
                  Projects
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
