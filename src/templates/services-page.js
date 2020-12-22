import React from 'react'
import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'

import Layout from '../components/Layout'

import social from '../img/social.gif'
import copywrite from '../img/copywrite.gif'
import design from '../img/design.gif'
import strategy from '../img/strategy.gif'

const heroContainer = {
    backgroundColor: '#2D2C2C',
    marginTop: '0',
    marginBottom: '0',
    paddingTop: '5em',
    paddingBottom: '5em',
}

const lineHeader = {
  color: '#F8F3F1',
}

const heroText = {
    fontFamily: 'EBGaramond',
    fontSize: '1.5em',
    color: '#F8F3F1',
    maxWidth: '750px',
}

const sectionContainer = {
    backgroundColor: '#2D2C2C',
    paddingTop: '0',
}

const copywriteImage = {
    width: '71%',
}

const designImage = {
  width: '77%',
}

const socialImage = {
  width: '77%',
}

const strategyImage = {
  width: '77%',
}

const titleText = {
    fontFamily: 'VisbyCF-Bold',
    fontWeight: '800',
    fontSize: '2.25em',
    color: '#F8F3F1',
    lineHeight: '2.5em',
    letterSpacing: '1px',
}

const paragraphText = {
    fontFamily: 'EBGaramond',
    fontSize: '1.5em',
    color: '#F8F3F1',
    lineHeight: '2em',
}

const fillerStyle = {
    borderRight: '2px solid #BA5930',
    height: '300px',
    marginTop: '3em',
    marginBottom: '3em',
}

const sectionContainerBottom = {
    backgroundColor: '#2D2C2C',
    paddingTop: '0',
}

const sectionContainerContact = {
    backgroundColor: '#2D2C2C',
    paddingTop: '0',
    paddingBottom: '10em',
}

const contactText = {
    fontFamily: 'VisbyCF-Regular',
    fontSize: '2.25em',
    color: '#F8F3F1',
}

const buttonStyle = {
    width: "244px",
    height: "51px",
  }

export const ServicesPageTemplate = ({
    image,
    title,
    hero,
    section1,
    section2,
    section3,
    section4,
    cta
}) => {
  return (
    <div className="services-container">
      <div
        className="has-text-left"
        style={heroContainer}
      >
        <div className="container is-max-widescreen">
          <h1 className="line-header" style={lineHeader}>{hero.heading}</h1>
          <p
            style={heroText}
          >
            {hero.subheading}
          </p>
        </div>
      </div>
      <section className="section" style={sectionContainer}>
        <div className="container">
          <div className="columns is-vcentered">
              <div className="column is-half has-text-right services-column-mobile">
                <figure>
                  <img src={copywrite} style={copywriteImage} />
                </figure>                  
              </div>
              <div className="column is-half services-column-mobile">
                  <h2 style={titleText}>{section1.heading}</h2>
                  <p style={paragraphText}>
                    {section1.description1}
                  </p>
                  <p style={paragraphText}>
                    {section1.description2}
                  </p>
                  <p style={paragraphText}>
                    {section1.description3}
                  </p>
                  <p style={paragraphText}>
                    {section1.description4}
                  </p>
                  <p style={paragraphText}>
                    {section1.description5}
                  </p>
                  <p style={paragraphText}>
                    {section1.description6}
                  </p>                  
                  <p style={paragraphText}>
                    {section1.description7}
                  </p>
                  <p style={paragraphText}>
                    {section1.description8}
                  </p>
              </div>
          </div>
        </div>
      </section>
      <section className="section" style={sectionContainer}>
        <div className="container is-max-widescreen">
          <div className="columns is-vcentered is-mobile">
              <div className="column is-half" style={fillerStyle}>
              </div>
          </div>
        </div>
      </section>
      <section className="section" style={sectionContainer}>
        <div className="container">
          <div className="columns is-vcentered services-reverse-column">
              <div className="column is-half has-text-right services-column-mobile">
                  <h2 style={titleText}>{section2.heading}</h2>
                  <p style={paragraphText}>
                    {section2.description1}
                  </p>
                  <p style={paragraphText}>
                    {section2.description2}
                  </p>
                  <p style={paragraphText}>
                    {section2.description3}
                  </p>
                  <p style={paragraphText}>
                    {section2.description4}
                  </p>
                  <p style={paragraphText}>
                    {section2.description5}
                  </p>
                  <p style={paragraphText}>
                    {section2.description6}
                  </p>                  
                  <p style={paragraphText}>
                    {section2.description7}
                  </p>
              </div>
              <div className="column is-half services-column-mobile">
                <figure>
                  <img alt="An illustration of hands weaving chakra" style={designImage} src={design}/>
                </figure>
              </div>
          </div>
        </div>
      </section>
      <section className="section" style={sectionContainer}>
        <div className="container is-max-widescreen">
          <div className="columns is-vcentered is-mobile">
              <div className="column is-half" style={fillerStyle}>
              </div>
          </div>
        </div>
      </section>
      <section className="section" style={sectionContainer}>
        <div className="container">
          <div className="columns is-vcentered">
              <div className="column is-half has-text-right services-column-mobile">
                <figure>
                  <img alt="An animated illustration of hands using a phone" style={socialImage} src={social}/>
                </figure>
              </div>
              <div className="column is-half services-column-mobile">
                  <h2 style={titleText}>{section3.heading}</h2>
                  <p style={paragraphText}>
                    {section3.description1}
                  </p>
                  <p style={paragraphText}>
                    {section3.description2}
                  </p>
                  <p style={paragraphText}>
                    {section3.description3}
                  </p>
                  <p style={paragraphText}>
                    {section3.description4}
                  </p>
                  <p style={paragraphText}>
                    {section3.description5}
                  </p>
              </div>
          </div>
        </div>
      </section>
      <section className="section" style={sectionContainer}>
        <div className="container is-max-widescreen">
          <div className="columns is-vcentered is-mobile">
              <div className="column is-half" style={fillerStyle}>
              </div>
          </div>
        </div>
      </section>
      <section className="section services-strategy-section" style={sectionContainerBottom}>
        <div className="container ">
          <div className="columns is-vcentered services-reverse-column">
              <div className="column is-half has-text-right services-column-mobile">
                  <h2 style={titleText}>{section4.heading}</h2>
                  <p style={paragraphText}>
                    {section4.description1}
                  </p>
                  <p style={paragraphText}>
                    {section4.description2}
                  </p>
                  <p style={paragraphText}>
                    {section4.description3}
                  </p>
                  <p style={paragraphText}>
                    {section4.description4}
                  </p>
                  <p style={paragraphText}>
                    {section4.description5}
                  </p>
              </div>
              <div className="column is-half services-column-mobile">
                <figure>
                  <img alt="An animated illustration of hands pointing at a chart" style={strategyImage} src={strategy}/>
                </figure>
              </div>
          </div>
        </div>
      </section>
      <section className="section services-filler-mobile-only" style={sectionContainer}>
        <div className="container is-max-widescreen">
          <div className="columns is-vcentered is-mobile">
              <div className="column is-half" style={fillerStyle}>
              </div>
          </div>
        </div>
      </section>
      <section className="section services-cta-container" style={sectionContainerContact}>
        <div className="container is-max-widescreen">
          <div className="content">
              <p style={contactText}>
              {cta.heading}
              </p>
          <Link to="/contact">
              <button class="button is-uppercase" style={buttonStyle}>{cta.button}</button>
          </Link>
          </div>
        </div>
      </section>
    </div>
)}

ServicesPageTemplate.propTypes = {
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
    hero: PropTypes.object,
    section1: PropTypes.object,
    section2: PropTypes.object,
    section3: PropTypes.object,
    section4: PropTypes.object,
    cta: PropTypes.object,
  }

const ServicesPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark
    
    return (
        <Layout>
          <ServicesPageTemplate
            image={frontmatter.image}
            title={frontmatter.title}
            hero={frontmatter.hero}
            section1={frontmatter.section1}
            section2={frontmatter.section2}
            section3={frontmatter.section3}
            section4={frontmatter.section4}
            cta={frontmatter.cta}
          />
        </Layout>
      )
    }
    
    ServicesPage.propTypes = {
        data: PropTypes.shape({
          markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
          }),
        }),
      } 

export default ServicesPage

export const pageQuery = graphql`
  query ServicesPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "services-page" } }) {
      frontmatter {
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
        hero {
            heading
            subheading
        }
        section1 {
            heading
            description1
            description2
            description3
            description4
            description5
            description6
            description7
            description8
            image {
                childImageSharp {
                    fluid(maxWidth: 2048, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        section2 {
            heading
            description1
            description2
            description3
            description4
            description5
            description6
            description7
            description8
            image {
                childImageSharp {
                    fluid(maxWidth: 2048, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                }
            }
        }        
        section3 {
            heading
            description1
            description2
            description3
            description4
            description5
            description6
            description7
            description8
            image {
                childImageSharp {
                    fluid(maxWidth: 2048, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                }
            }
        }        
        section4 {
            heading
            description1
            description2
            description3
            description4
            description5
            description6
            description7
            description8
            image {
                childImageSharp {
                    fluid(maxWidth: 2048, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        cta {
            heading
            button
        }
      }
    }
  }
`
