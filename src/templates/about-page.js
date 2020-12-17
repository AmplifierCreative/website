import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { graphql } from 'gatsby'

const heroContainer = {
    backgroundColor: '#2D2C2C',
    marginTop: '0',
    marginBottom: '0',
    height: "300px",
    padding: '5rem 2rem',
}

const lineHeader = {
  color: '#F8F3F1',
}

const sectionContainer = {
    backgroundColor: '#2D2C2C',
    paddingTop: '0',
    paddingBottom: '0',
    paddingRight: '2rem',
    paddingLeft: '2rem',
}

const fillerStyle = {
  borderRight: '2px solid #BA5930',
  height: '300px',
  marginTop: '3em',
  marginBottom: '3em',
}

const imageTopContainer = {
    height: '550px',
}

const imageBottomContainer = {
  height: '650px',
}

const imageBottom = {
  paddingTop: "10em",
  width: '100%'
}

const imageTop = {
    width: '100%'
  }

const paragraphText = {
    fontFamily: 'EBGaramond',
    fontSize: '1.5em',
    color: '#F8F3F1',
    lineHeight: '1.65em',
    marginBottom: '9px',
}


export const AboutPageTemplate = ({
    image,
    title,
    topSection,
    bottomSection,
}) => {
    console.log(bottomSection.image)
  return (
    <React.Fragment>
        <div
        className="has-text-left"
        style={heroContainer}
        >
        <div class="container is-max-widescreen">
            <h1 className="line-header" style={lineHeader}>{title}</h1>
        </div>
        </div>
        <section className="about-section-container">
        <div className="container is-max-widescreen">
            <div className="columns services-reverse-column is-vcentered">
            <div className="column is-half about-border">
                    <div className="columns about-img-container" style={imageTopContainer}>
                        {topSection.image ? (
                          <figure style={imageTop}>
                            <PreviewCompatibleImage
                              imageInfo={{
                                image: topSection.image,
                                }}
                            />
                          </figure>
                        ) : null}
                    </div>
                    <div className="columns">
                        <div className="column has-text-right about-column-mobile">
                            <p style={paragraphText}>
                                {bottomSection.description1}
                            </p>
                            <p style={paragraphText}>
                                {bottomSection.description2}
                            </p>
                            <p style={paragraphText}>
                                {bottomSection.description3}
                            </p>
                        </div>
                    </div>
            </div>
            <div className="section services-filler-mobile-only" style={sectionContainer}>
                <div className="container is-max-widescreen">
                <div className="columns is-vcentered is-mobile">
                    <div className="column is-half" style={fillerStyle}></div>
                </div>
                </div>
            </div>
            <div className="column is-half" >
                <div className="columns">
                    <div className="column">
                        <p className="letter-stroke-dk" style={paragraphText}>
                            {topSection.description1}
                        </p>
                        <p style={paragraphText}>
                            {topSection.description2}
                        </p>
                    </div>
                </div>
                <div className="columns about-img-container" style={imageBottomContainer}>
                    {bottomSection.image ? (
                          <figure style={imageBottom}>
                            <PreviewCompatibleImage
                              imageInfo={{
                                image: bottomSection.image,
                        
                              }}
                            />
                          </figure>
                        ) : null}

                </div>
            </div>
            </div>
        </div>
        </section>
    </React.Fragment>
)}

AboutPageTemplate.propTypes = {
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
    topSection: PropTypes.object,
    bottomSection: PropTypes.object,
  }

const AboutPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark
  
    return (
      <Layout>
        <AboutPageTemplate
          image={frontmatter.image}
          title={frontmatter.title}
          topSection={frontmatter.topSection}
          bottomSection={frontmatter.bottomSection}
        />
      </Layout>
    )
  }
  
  AboutPage.propTypes = {
    data: PropTypes.shape({
      markdownRemark: PropTypes.shape({
        frontmatter: PropTypes.object,
      }),
    }),
  }

export default AboutPage

export const pageQuery = graphql`
  query AboutPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        topSection {
            description1
            description2
            image {
                childImageSharp {
                    fluid(maxWidth: 2048, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        bottomSection {
            description1
            description2
            description3
            image {
                childImageSharp {
                    fluid(maxWidth: 2048, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                }
            }
        }
      }
    }
  }
`
