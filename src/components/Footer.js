import React from 'react'
import { Link } from 'gatsby'

import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import linkedin from '../img/social/linkedin.svg'

const footer = {
  color: '#fff',
  backgroundColor: '#2D2C2C',
};

const socialCircle = {    
  borderRadius: "50%",
  width: "4rem",
  height: "4rem",
  background: "#fff",
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
                <input className="input is-medium" type="email" placeholder="enter your email address to stay in touch"/>
                <div className="columns">
                  <div className="column is-2">
                    <section className="menu">
                      <ul className="menu-list">
                        <li>
                          <Link to="/" className="navbar-item">
                            About
                          </Link>
                        </li>
                        <li>
                          <Link className="navbar-item" to="/about">
                            Services
                          </Link>
                        </li>
                      </ul>
                    </section>
                  </div>
                  <div className="column is-2">
                    <section>
                      <ul className="menu-list">
                        <li>
                          <Link className="navbar-item" to="/blog">
                            Portfolio
                          </Link>
                        </li>
                        <li>
                          <Link className="navbar-item" to="/contact">
                            Blog
                          </Link>
                        </li>
                      </ul>
                    </section>
                  </div>
                  <div className="column is-2">
                    <section>
                      <ul className="menu-list">
                        <li>
                          <Link className="navbar-item" to="/blog">
                            Contact
                          </Link>
                        </li>
                        <li>
                          <Link className="navbar-item" to="/contact">
                            Privacy
                          </Link>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
                <div className="columns">
                  <h5>&#169; Amplifier Creative 2020 view our <Link href="#" className="link">Terms of Use</Link> and <Link href="#" className="link">Privacy Policy</Link></h5>
                </div>
              </div>
              <div className="column is-one-third">
                <div className="columns">
                  <div className="column">
                    <h5>Follow us</h5>
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
                <div className="column is-2" style={socialCircle}>
                  <a title="instagram" href="#">
                    <img
                      style={socialSvg}
                      src={instagram}
                      alt="Instagram"
                    />
                  </a>
                </div>
                <div className="column is-2" style={socialCircle}>
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
