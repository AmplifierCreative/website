import React from 'react'
import { Link } from 'gatsby'

import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import linkedin from '../img/social/linkedin.svg'

const footer = {
  color: '#F8F3F1',
  backgroundColor: '#2D2C2C',
};

const emailInput = {
  color: '#F8F3F1',
  backgroundColor: '#2D2C2C',
  border: "none",
  fontSize: "2rem",
  paddingLeft: "0",
  marginBottom: "1em",
};

const menuItemLinkA = {
  fontFamily: "VisbyCF-Regular",
  letterSpacing: "2.25px",
  textTransform: "uppercase",
  paddingLeft: "0",
  marginBottom: ".75em",
}

const menuItemLink = {
  fontFamily: "VisbyCF-Regular",
  letterSpacing: "2.25px",
  textTransform: "uppercase",
  paddingLeft: "0",
}

const footerPolicy = {
  color: '#F8F3F1',
  textTransform: "uppercase",
  fontFamily: "VisbyCF-Regular",
  letterSpacing: "2.75px",
}

const footerPolicyContainer = {
  marginTop: "2em",
}

const footerPolicyLink = {
  color: '#F8F3F1',
  textDecoration: "underline",
}

const socialTextContainer = {
  paddingLeft: "0",
}

const socialText = {
  fontSize: "2rem",
  color: '#F8F3F1',
  fontWeight: "700",
  paddingTop: "calc(0.5em - 1px)",
  paddingBottom: "calc(0.5em - 1px)"
}

const socialCircle = {    
  borderRadius: "50%",
  width: "4rem",
  height: "4rem",
  background: "#C4C4C4",
}

const socialCircleB = {    
  borderRadius: "50%",
  width: "4rem",
  height: "4rem",
  background: "#C4C4C4",
  marginLeft: "1.25rem",
}

const socialSvg = {
  width: "90%",
  height: "auto",
  display: "block", 
  marginRight: "auto",
  marginLeft: "auto",
}

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer" style={footer}>
          <div className="container">
            <div className="columns">
              <div className="column is-two-thirds">
                <input className="input is-medium email-input" style={emailInput} type="email" placeholder="enter your email address to stay in touch"/>
                <div className="columns">
                  <div className="column is-3">
                    <section className="menu">
                      <ul className="menu-list">
                        <li>
                          <Link to="/" className="navbar-item" style={menuItemLinkA}>
                            About
                          </Link>
                        </li>
                        <li>
                          <Link className="navbar-item" to="/about" style={menuItemLink}>
                            Services
                          </Link>
                        </li>
                      </ul>
                    </section>
                  </div>
                  <div className="column is-3">
                    <section>
                      <ul className="menu-list">
                        <li>
                          <Link className="navbar-item" to="/blog" style={menuItemLinkA}>
                            Portfolio
                          </Link>
                        </li>
                        <li>
                          <Link className="navbar-item" to="/contact" style={menuItemLink}>
                            Blog
                          </Link>
                        </li>
                      </ul>
                    </section>
                  </div>
                  <div className="column is-3">
                    <section>
                      <ul className="menu-list">
                        <li>
                          <Link className="navbar-item" to="/blog" style={menuItemLinkA}>
                            Contact
                          </Link>
                        </li>
                        <li>
                          <Link className="navbar-item" to="/contact" style={menuItemLink}>
                            Privacy
                          </Link>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
                <div className="columns">
                  <div className="column" style={footerPolicyContainer}>
                    <p style={footerPolicy}>&#169; Amplifier Creative 2020 view our <Link href="#" className="link" style={footerPolicyLink}>Terms of Use</Link> and <Link href="#" className="link" style={footerPolicyLink}>Privacy Policy</Link>.</p>
                  </div>
                </div>
              </div>
              <div className="column is-one-third">
                <div className="columns">
                  <div className="column" style={socialTextContainer}>
                    <h5 style={socialText}>Follow us</h5>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-2" style={socialCircle}>
                    <a title="twitter" href="#">
                      <img
                        style={socialSvg}
                        src={twitter}
                        alt="Twitter"
                      />
                    </a>
                </div>
                <div className="column is-2" style={socialCircleB}>
                  <a title="instagram" href="#">
                    <img
                      style={socialSvg}
                      src={instagram}
                      alt="Instagram"
                    />
                  </a>
                </div>
                <div className="column is-2" style={socialCircleB}>
                  <a title="linkedin" href="#">
                    <img
                      style={socialSvg}
                      src={linkedin}
                      alt="LinkedIn"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
