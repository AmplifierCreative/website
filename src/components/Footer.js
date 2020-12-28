import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import addToMailchimp from 'gatsby-plugin-mailchimp'

import Content, { HTMLContent } from '../components/Content'
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

const menuItemLink = {
  fontFamily: 'VisbyCF-Medium',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  paddingLeft: '0',
  marginBottom: '.75em',
}

const footerPolicy = {
  color: '#F8F3F1',
  textTransform: 'uppercase',
  fontFamily: 'VisbyCF-Medium',
  letterSpacing: '2px',
}

const footerPolicyContainer = {
  marginTop: '2.75em',
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

const LinksMenu = ({ links, start, end }) => {
  return links.slice(start, end).map((link) => {
    const { path, text, local } = link

    if (local) {
      return (
        <li>
          <Link
          to={link.path}
          className="footer-item"
          style={menuItemLink}
          >
            {link.text}
          </Link>
        </li>
      )
    } 

    if (!local) {
      return (
      <li>
        <a
        href={path}
        className="footer-item"
        style={menuItemLink}
        >
          {text}
        </a>
      </li>
      )
    }
    return null
  })
}

LinksMenu.propTypes = {
  links: PropTypes.array,
}

const MobileMenu = ({ _links }) => {
  return (
    <div className="columns is-mobile has-text-centered">
      <div className="column is-6">
        <section className="menu">
          <ul className="footer-list">
             <LinksMenu links={ _links } start={0} end={3} />
          </ul>
        </section>
      </div>
      <div className="column is-6">
        <section>
          <ul className="footer-list">
            <LinksMenu links={ _links } start={3} end={6} />
          </ul>
        </section>
      </div>
    </div>
  )
}

const DesktopMenu = ({ _links }) => { 
  return (
    <div className="columns">
      <div className="column is-3">
        <section className="menu">
          <ul className="footer-list">
            <LinksMenu links={ _links } start={0} end={2} />
          </ul>
        </section>
      </div>
      <div className="column is-3">
        <section>
          <ul className="footer-list">
            <LinksMenu links={ _links } start={2} end={4} />
          </ul>
        </section>
      </div>
      <div className="column is-3">
        <section>
          <ul className="footer-list">
            <LinksMenu links={ _links } start={4} end={6} />
          </ul>
        </section>
      </div>
    </div>
  )
}

MobileMenu.propTypes = {
  _links: PropTypes.array,
}

DesktopMenu.propTypes = {
  _links: PropTypes.array,
}

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
    const isMobile = this.state.isMobile;

    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    
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
              { isMobile ? 
                  <MobileMenu _links={posts[0].node.frontmatter.footer.menu} /> : 
                  <DesktopMenu _links={posts[0].node.frontmatter.footer.menu}/>
              }
            </div>
            <div className="column is-one-third">
              <div className="columns">
                <div className="column" style={socialTextContainer}>
                  <h5 style={socialText}>Follow us</h5>
                </div>
              </div>
              <div className={`columns is-mobile ${ this.state.isMobile && 'is-centered'}`}>
                <div className="column is-2" style={socialCircle}>
                  <a title="twitter" href={posts[0].node.frontmatter.footer.social.twitter}>
                    <img style={socialSvg} src={twitter} alt="Twitter" />
                  </a>
                </div>
                <div className="column is-2" style={socialCircleB}>
                  <a title="instagram" href={posts[0].node.frontmatter.footer.social.ig}>
                    <img style={socialSvg} src={instagram} alt="Instagram" />
                  </a>
                </div>
                <div className="column is-2" style={socialCircleB}>
                  <a title="linkedin" href={posts[0].node.frontmatter.footer.social.linkedin}>
                    <img style={socialSvg} src={linkedin} alt="LinkedIn" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={`columns ${ this.state.isMobile && 'has-text-centered'}`}>
                <div className="column " style={footerPolicyContainer}>
                  <span style={footerPolicy}>
                    <HTMLContent content={posts[0].node.html} className={"link footer-link-hover"} />
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
              html
              frontmatter {
                templateKey
                footer {
                  menu {
                    text
                    path
                    local
                  }
                  social {
                    twitter
                    ig
                    linkedin
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