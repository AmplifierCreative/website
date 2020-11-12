import React from 'react'
import { Link } from 'gatsby'
import styles from "./variables.sass"
import logo from '../img/logo.svg'


const nav = {
  backgroundColor: "#2D2C2C",
  margin: "0 auto",
  position: "relative",
}

const navBarContainer = {
  maxWidth: "1240px",
  margin: "auto",
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
marginLeft: "-6px",
}

const fillerContainer = {
  paddingTop: "4rem",
}

const burgerContainer = {
  backgroundColor: "#2D2C2C",
  paddingTop: "4rem",
}

const burger = {
  display: "flex",
  flexDirection: "column",
  alignItems: "end",
  zIndex: "1000",
  position: "relative",
  cursor: "pointer",
}

const burgerLine = {
  height: '10px',
  width: '81px',
  display: 'block',
  backgroundColor: '#BA5930',
  marginTop: "8px",
}

const navMenuContainer = {
  backgroundColor: '#F8F3F1',
  height: "76.3vh",
  position: "absolute",
  right: "0px",
  top: "0",
  right: "0",
  width: "33.333%",
  zIndex: "10",
}

const navMenu = {
  boxShadow: "none",
  paddingRight: "5em",
  paddingTop: "3em",
}

const navItem = {
  color: '#BA5930',
  fontSize: '2.5rem',
  fontWeight: '800',
  padding: "0",
}
const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },    
    )
  }

  render() {
    return (
      <nav className="columns" role="navigation" aria-label="main-navigation" style={nav}>
        <div className="column" style={navBarContainer}>
        <div className="columns">
        <div
          className="column is-one-third"
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
              onClick={() => this.toggleHamburger()}
              style={burger}
            >
              <span style={burgerLine} />
              <span style={burgerLine} />
              <span style={burgerLine} />
            </div>
          </div>
        </div>
        </div>
        {this.state.active ? (
          <div style={navMenuContainer}>
            <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
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
        ): null

        }
      </nav>
    )
  }
}

export default Navbar
