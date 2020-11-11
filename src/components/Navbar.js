import React from 'react'
import { Link } from 'gatsby'
import styles from './all.sass'
import logo from '../img/logo.svg'


const nav = {
  backgroundColor: "#2D2C2C",
  margin: "0 auto",
  position: "relative",
}

const logoContainer = {
  backgroundColor: "#2D2C2C",
  padding: "0",
  paddingTop: "4rem",
}

const navLogoLink = {
  paddingLeft: "0",
}

const logoStyle = {
  height: '50px',
  width: 'auto',
  margin: '1.5rem 0 0 auto',
}

const fillerContainer = {
  paddingTop: "4rem",
}

const burgerContainer = {
  backgroundColor: "#F8F3F1",
  height: "74.71vh",
  position: "absolute",
  right: "0px",
  paddingTop: "4rem",
}

const navItem = {
  color: '#BA5930',
  fontSize: '2.5rem',
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

const navMenu = {
  position: "absolute",
  backgroundColor: '#F8F3F1',
  zIndex: "10",
  boxShadow: "none",
  width: "100%",
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
      <nav className="columns" role="navigation" aria-label="main-navigation" style={nav}>
        <div
          className="column is-one-third has-text-right"
          role="navigation"
          ariaLabel="main navigation"
          style={logoContainer}
        >
          <Link to="/" className="navbar-item" title="Logo" style={navLogoLink}>
            <img src={logo} alt="Amplifier Creative" style={logoStyle} />
          </Link>
        </div>
        <div className="column is-one-third" style={fillerContainer}></div>
        <div className="column is-one-third" style={burgerContainer}> 
          <div
            className={`${this.state.navBarActiveClass}`}
            data-target="navMenu"
            onClick={() => this.toggleHamburger()}
            style={burgerPadding}
          >
            <span style={burgerLine} />
            <span style={burgerLine} />
            <span style={burgerLine} />
          </div>
          <div
            id="navMenu"
            className={`navbar-menu is-active`}
            style={navMenu}>
            <div>
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
        </div>
      </nav>
    )
  }
}

export default Navbar
