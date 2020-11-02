import React from 'react'
import { Link } from 'gatsby'

import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import linkedin from '../img/social/linkedin.svg'

const footer = {
  color: '#fff',
  backgroundColor: '#2D2C2C',
};

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer" style={footer}>
        <div>
          <div className="container">
            <div className="columns">
              <div className="column is-half">
                <input className="input is-medium" type="email" placeholder="enter your email address to stay in touch"/>
              </div>
              <div className="column is-half">
                <h5 className="column is-half is-3">Follow us</h5>
              </div>
            </div>
            <div style={{ maxWidth: '100vw' }} className="columns">
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
              <div className="column is-4 social">
                <a title="twitter" href="#">
                  <img
                    className="fas fa-lg"
                    src={twitter}
                    alt="Twitter"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="instagram" href="#">
                  <img
                    src={instagram}
                    alt="Instagram"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="placeholder" href="#">
                  <img
                    src={linkedin}
                    alt="LinkedIn"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
              </div>
            </div>
            <div style={{ maxWidth: '100vw' }} className="columns">
              <h5>&#169; Amplifier Creative 2020 view our <Link href="#" className="link">Terms of Use</Link> and <Link href="#" className="link">Privacy Policy</Link></h5>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
