import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import addToMailchimp from 'gatsby-plugin-mailchimp'

import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import linkedin from '../img/social/linkedin.svg'

const footer = {
  color: '#F8F3F1',
  backgroundColor: '#2D2C2C',
}

const emailInput = {
  color: '#F8F3F1',
  backgroundColor: '#2D2C2C',
  border: 'none',
  fontSize: '2rem',
  paddingLeft: '0',
  marginBottom: '1em',
}

const emailTextArea = {
  color: '#F8F3F1',
  backgroundColor: '#2D2C2C',
  border: 'none',
  fontSize: '2rem',
  paddingTop: '2%',
  paddingLeft: '0',
  marginBottom: '.75em',
  textAlign: 'center',
  width: '100%',
}


const menuItemLinkA = {
  fontFamily: 'VisbyCF-Medium',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  paddingLeft: '0',
  marginBottom: '.75em',
}

const menuItemLink = {
  fontFamily: 'VisbyCF-Medium',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  paddingLeft: '0',
}

const footerPolicy = {
  color: '#F8F3F1',
  textTransform: 'uppercase',
  fontFamily: 'VisbyCF-Medium',
  letterSpacing: '2px',
}

const footerPolicyContainer = {
  marginTop: '3.5em',
}

const footerPolicyLink = {
  color: '#F8F3F1',
  textDecoration: 'underline',
}

const socialTextContainer = {
  paddingLeft: '0',
}

const socialText = {
  fontSize: '2rem',
  color: '#F8F3F1',
  fontWeight: '700',
  paddingTop: 'calc(0.5em - 1px)',
  paddingBottom: 'calc(0.5em - 1px)',
}

const socialCircle = {
  border: '3px solid #F4F4F4',
  width: '4rem',
  height: '4rem',
}

const socialCircleB = {
  border: '3px solid rgb(244, 244, 244)',
  width: '4rem',
  height: '4rem',
  marginLeft: '1.25rem',
}

const socialSvg = {
  height: 'auto',
  display: 'block',
  marginRight: 'auto',
  marginLeft: 'auto',
}

const mobileMenu = <div className="columns is-mobile has-text-centered">
<div className="column is-6">
  <section className="menu">
    <ul className="footer-list">
      <li>
        <Link
          to="/about"
          className="footer-item"
          style={menuItemLinkA}
        >
          About
        </Link>
      </li>
      <li>
        <Link
          className="footer-item"
          to="/services"
          style={menuItemLink}
        >
          Services
        </Link>
      </li>
      <li>
        <Link
          className="footer-item"
          to="/contact"
          style={menuItemLinkA}
        >
          Contact
        </Link>
      </li>
    </ul>
  </section>
</div>
<div className="column is-6">
  <section>
    <ul className="footer-list">
    <li>
        <Link
          className="footer-item"
          to="/projects"
          style={menuItemLinkA}
        >
          Portfolio
        </Link>
      </li>
      <li>
        <Link
          className="footer-item"
          to="/blog"
          style={menuItemLink}
        >
          Blog
        </Link>
      </li>
      <li>
        <Link
          className="footer-item"
          to="/privacy"
          style={menuItemLink}
        >
          Privacy
        </Link>
      </li>
    </ul>
  </section>
</div>
</div>

const desktopMenu = <div className="columns">
<div className="column is-3">
  <section className="menu">
    <ul className="footer-list">
      <li>
        <Link
          to="/about"
          className="footer-item"
          style={menuItemLinkA}
        >
          About
        </Link>
      </li>
      <li>
        <Link
          className="footer-item"
          to="/services"
          style={menuItemLink}
        >
          Services
        </Link>
      </li>
    </ul>
  </section>
</div>
<div className="column is-3">
  <section>
    <ul className="footer-list">
      <li>
        <Link
          className="footer-item"
          to="/projects"
          style={menuItemLinkA}
        >
          Portfolio
        </Link>
      </li>
      <li>
        <Link
          className="footer-item"
          to="/blog"
          style={menuItemLink}
        >
          Blog
        </Link>
      </li>
    </ul>
  </section>
</div>
<div className="column is-3">
  <section>
    <ul className="footer-list">
      <li>
        <Link
          className="footer-item"
          to="/contact"
          style={menuItemLinkA}
        >
          Contact
        </Link>
      </li>
      <li>
        <Link
          className="footer-item"
          to="/privacy"
          style={menuItemLink}
        >
          Privacy
        </Link>
      </li>
    </ul>
  </section>
</div>
</div>

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: '',
      isMobile: '',
    };
    this.handleChange = this.handleChange.bind(this);
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
  
  handleChange(event) {    
    this.setState({value: event.target.value});  
  }

  handleSubmit = async event => {
    event.preventDefault()
    let email = this.state.emailValue;
    const response = await addToMailchimp(email);
  }

  render() {
    const isMobile= this.state.isMobile;

    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    
    console.log(posts[0].node.frontmatter.footer.copywrite)
    return (
      <footer className="footer" style={footer}>
        <div className="container is-max-widescreen">
          <div className={`columns ${ this.state.isMobile && 'has-text-centered'}`}>
            <div className="column is-two-thirds">
              <form onSubmit={this.handleSubmit}>
              { isMobile ? 
                  <textarea
                    className="email-input"
                    style={emailTextArea}
                    type="email"
                    placeholder="enter your email address to stay in touch"
                    rows="2"
                    col="20"
                    emailValue={this.state.emailValue} 
                    onChange={this.handleChange}
                  /> : 
                  <input
                    className="input is-medium email-input"
                    style={emailInput}
                    type="email"
                    placeholder="enter your email address to stay in touch"
                    emailValue={this.state.emailValue} 
                    onChange={this.handleChange} 
                  />
                }
              </form>
              {isMobile ? mobileMenu : desktopMenu}
            </div>
            <div className="column is-one-third">
              <div className="columns">
                <div className="column" style={socialTextContainer}>
                  <h5 style={socialText}>Follow us</h5>
                </div>
              </div>
              <div className={`columns is-mobile ${ this.state.isMobile && 'is-centered'}`}>
                <div className="column is-2" style={socialCircle}>
                  <a title="twitter" href="#">
                    <img style={socialSvg} src={twitter} alt="Twitter" />
                  </a>
                </div>
                <div className="column is-2" style={socialCircleB}>
                  <a title="instagram" href="#">
                    <img style={socialSvg} src={instagram} alt="Instagram" />
                  </a>
                </div>
                <div className="column is-2" style={socialCircleB}>
                  <a title="linkedin" href="#">
                    <img style={socialSvg} src={linkedin} alt="LinkedIn" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={`columns ${ this.state.isMobile && 'has-text-centered'}`}>
                <div className="column " style={footerPolicyContainer}>
                  <span style={footerPolicy}>
                    &#169; Amplifier Creative 2020 view our{' '}
                    <Link to="/terms" className="link footer-link-hover" style={footerPolicyLink}>
                      Terms of Use
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="link footer-link-hover" style={footerPolicyLink}>
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </div>
              </div>
        </div>
      </footer>
    )
  }
}

Footer.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        allMarkdownRemark(
          filter: {
            frontmatter: {
              templateKey: { eq: "global-page" }
            }
          }
        ) {
          edges {
            node {
              frontmatter {
                templateKey
                footer {
                  menu {
                    text
                    path
                    local
                  }
                  copywrite
                  social {
                    path
                    local
                  }
                }
                }
              }
            }
          }
        }  
      `}
    render={(data) => <Footer data={data} />}
  />
)