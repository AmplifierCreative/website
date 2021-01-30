import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import { v4 } from 'uuid'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { Helmet } from 'react-helmet'

import { HTMLContent } from '../components/Content'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import linkedin from '../img/social/linkedin.svg'

const LinksMenu = ({ links, start, end }) => {
  return links.slice(start, end).map((link) => {
    const { path, text, local } = link

    if (local) {
      return (
        <li key={v4()}>
          <Link to={link.path} className="footer-item footer-menu-item">
            {link.text}
          </Link>
        </li>
      )
    } else {
      return (
        <li key={v4()}>
          <a href={path} className="footer-item footer-menu-item">
            {text}
          </a>
        </li>
      )
    }
  })
}

LinksMenu.propTypes = {
  links: PropTypes.array,
}

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      emailValue: '',
      res: '',
      active: false,
      footerActiveClass: '',
      sent: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  handleChange(event) {
    this.setState({ emailValue: event.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    let email = this.state.emailValue
    const response = await addToMailchimp(email)
    this.setState({ res: response })
    this.formStatus()
  }

  formStatus(res) {
    if (res === 'error') {
      this.setState({ sent: !this.state.sent })
    } else {
      this.setState({ sent: !this.state.sent })
    }
  }

  resetForm() {
    this.setState({ sent: !this.state.sent })
  }

  showSubmit = () => {
    this.setState(
      {
        active: true,
      },
      this.setState({
        footerActiveClass: 'is-active',
      })
    )
  }

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <footer className="footer">
        <Helmet>
          <script src="https://kit.fontawesome.com/00e2e73915.js" crossorigin="anonymous"></script>
        </Helmet>
        <div className="container is-max-widescreen">
          <div
            className="columns has-text-centered-mobile"
          >
            <div className="column is-two-thirds-desktop">
              <div>
                {this.state.sent ? (
                  <div
                    className="footer-form footer-response"
                  >
                    <div className="results-container">
                      <h5>
                        {this.state.res.result === 'error' ? ':/ ' : 'Woot! '}
                      </h5>
                      <p className="results-text">{this.state.res.msg}</p>
                    </div>
                    <button className="reset-btn" onClick={this.resetForm}>
                      {this.state.res.result === 'error'
                        ? 'Try again'
                        : 'Add another'}
                    </button>
                  </div>
                ) : (
                  <form
                    className={`footer-form ${this.state.footerActiveClass}`}
                    onSubmit={this.handleSubmit}
                  >
                    <input
                        className="email-input"
                        type="email"
                        placeholder="enter your email address to stay in touch"
                        emailvalue={this.state.emailValue}
                        onChange={this.handleChange}
                        onFocus={this.showSubmit}
                      />
                    <input
                        className="email-input mobile-input has-text-centered-mobile"
                        type="email"
                        placeholder="join our email list"
                        emailvalue={this.state.emailValue}
                        onChange={this.handleChange}
                        onFocus={this.showSubmit}
                      />
                    <button
                      type="submit"
                      onSubmit={this.handleSubmit}
                      className={`submit-btn-alt ${this.state.footerActiveClass}`}
                    >
                      <i class="fas fa-arrow-circle-right"></i>
                    </button>
                  </form>
                )}
              </div>
              {/* Mobile Links Menu */}
              <div className='has-text-centered mobile-menu'>
                <ul className="footer-list">
                  <LinksMenu links={posts[0].node.frontmatter.footer.menu} start={0} end={3} />
                </ul>
                <ul className="footer-list">
                  <LinksMenu links={posts[0].node.frontmatter.footer.menu} start={3} end={6} />
                </ul>
              </div>
              {/* Desktop Links Menu */}
              <div className="desktop-menu">
                <ul className="footer-list left-list-item">
                  <LinksMenu links={posts[0].node.frontmatter.footer.menu} start={0} end={2} />
                </ul>
                <ul className="footer-list">
                  <LinksMenu links={posts[0].node.frontmatter.footer.menu} start={2} end={4} />
                </ul>
                <ul className="footer-list">
                  <LinksMenu links={posts[0].node.frontmatter.footer.menu} start={4} end={6} />
                </ul>
              </div>
            </div>
            {/* Social Menu */}
            <div className="column is-one-third-desktop">
              <div>
                <h5 className="footer-social-header">Follow us</h5>
              </div>
              <div
                className='columns is-mobile is-justify-content-center-mobile m-0'>
                <div className="column is-2 social-icon-container">
                  <a
                    title="twitter"
                    href={posts[0].node.frontmatter.footer.social.twitter}
                  >
                    <img className="footer-sm-icon" src={twitter} alt="Twitter" />
                  </a>
                </div>
                <div className="column is-2 social-icon-container add-margin">
                  <a
                    title="instagram"
                    href={posts[0].node.frontmatter.footer.social.ig}
                  >
                    <img className="footer-sm-icon" src={instagram} alt="Instagram" />
                  </a>
                </div>
                <div className="column is-2 social-icon-container add-margin">
                  <a
                    title="linkedin"
                    href={posts[0].node.frontmatter.footer.social.linkedin}
                  >
                    <img className="footer-sm-icon" src={linkedin} alt="LinkedIn" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className='columns has-text-centered-mobile'
          >
            <div className="column footer-policy-container">
              <span className="footer-policy">
                <HTMLContent
                  content={posts[0].node.html}
                  className={'link footer-link-hover'}
                />
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
          filter: { frontmatter: { templateKey: { eq: "global-page" } } }
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
