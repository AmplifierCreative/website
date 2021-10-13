import React from 'react'
import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { FadeIn, TrailsWrapper } from '../components/Utilities'

const config = { mass: 5, tension: 2000, friction: 200 }

export const ServicesPageTemplate = ({
  hero,
  section1,
  section2,
  section3,
  section4,
  cta,
  seo,
}) => {
  return (
    <main className='services-container page-padding'>
      <SEO
        title={seo.title}
        description={seo.description}
        image={seo.image.name}
      />
      <div className='services-hero-container has-text-left'>
        <div className='container is-max-widescreen'>
          <FadeIn configuration={config}>
            <h1 className='line-header'>{hero.heading}</h1>
            <p className='hero-text'>{hero.subheading}</p>
          </FadeIn>
        </div>
      </div>
      <section className='section services-section-container'>
        <div className='container'>
          <div className='columns is-vcentered'>
            <div className='column is-half has-text-right services-column-mobile'>
              <FadeIn configuration={config}>
                {section1.image && section1.image.childImageSharp ? (
                  <figure className='services-image-copywrite'>
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: section1.image.image,
                      }}
                    />
                  </figure>
                ) : (
                  <figure>
                    <img
                      alt={section1.image.alt}
                      className='services-image-copywrite'
                      src={section1.image.image.publicURL}
                    />
                  </figure>
                )}
              </FadeIn>
            </div>
            <div className='column is-half services-column-mobile'>
              <TrailsWrapper configuration={config}>
                <h2 className='services-title-text'>{section1.heading}</h2>
                {section1.subheadings &&
                  section1.subheadings.map((item) => (
                    <p key={v4()} className='services-paragraph-text'>
                      {item.text}
                    </p>
                  ))}
              </TrailsWrapper>
            </div>
          </div>
        </div>
      </section>
      <section className='section services-section-container'>
        <div className='container is-max-widescreen'>
          <div className='columns is-vcentered is-mobile'>
            <div className='column is-half services-filler-style'></div>
          </div>
        </div>
      </section>
      <section className='section services-section-container'>
        <div className='container'>
          <div className='columns is-vcentered services-reverse-column'>
            <div className='column is-half has-text-right services-column-mobile'>
              <TrailsWrapper configuration={config}>
                <h2 className='services-title-text'>{section2.heading}</h2>
                {section2.subheadings &&
                  section2.subheadings.map((item) => (
                    <p key={v4()} className='services-paragraph-text'>
                      {item.text}
                    </p>
                  ))}
              </TrailsWrapper>
            </div>
            <div className='column is-half services-column-mobile'>
              <FadeIn configuration={config}>
                {section2.image && section2.image.childImageSharp ? (
                  <figure className='services-image-design'>
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: section2.image.image,
                      }}
                    />
                  </figure>
                ) : (
                  <figure>
                    <img
                      alt={section2.image.alt}
                      className='services-image-design'
                      src={section2.image.image.publicURL}
                    />
                  </figure>
                )}
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      <section className='section services-section-container'>
        <div className='container is-max-widescreen'>
          <div className='columns is-vcentered is-mobile'>
            <div className='column is-half services-filler-style'></div>
          </div>
        </div>
      </section>
      <section className='section services-section-container'>
        <div className='container'>
          <div className='columns is-vcentered'>
            <div className='column is-half has-text-right services-column-mobile'>
              <FadeIn configuration={config}>
                {section3.image.image &&
                section3.image.image.childImageSharp ? (
                  <figure className='services-image-social'>
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: section3.image.image,
                      }}
                    />
                  </figure>
                ) : (
                  <figure>
                    <img
                      alt={section3.image.alt}
                      className='services-image-social'
                      src={section3.image.image.publicURL}
                    />
                  </figure>
                )}
              </FadeIn>
            </div>
            <div className='column is-half services-column-mobile'>
              <TrailsWrapper configuration={config}>
                <h2 className='services-title-text'>{section3.heading}</h2>
                {section3.subheadings &&
                  section3.subheadings.map((item) => (
                    <p key={v4()} className='services-paragraph-text'>
                      {item.text}
                    </p>
                  ))}
              </TrailsWrapper>
            </div>
          </div>
        </div>
      </section>
      <section className='section services-section-container'>
        <div className='container is-max-widescreen'>
          <div className='columns is-vcentered is-mobile'>
            <div className='column is-half services-filler-style'></div>
          </div>
        </div>
      </section>
      <section className='section services-strategy-section services-section-container'>
        <div className='container '>
          <div className='columns is-vcentered services-reverse-column'>
            <div className='column is-half has-text-right services-column-mobile'>
              <TrailsWrapper configuration={config}>
                <h2 className='services-title-text'>{section4.heading}</h2>
                {section4.subheadings &&
                  section4.subheadings.map((item) => (
                    <p key={v4()} className='services-paragraph-text'>
                      {item.text}
                    </p>
                  ))}
              </TrailsWrapper>
            </div>
            <div className='column is-half services-column-mobile'>
              <FadeIn configuration={config}>
                {section4.image.image &&
                section4.image.image.childImageSharp ? (
                  <figure className='services-image-strategy'>
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: section4.image.image,
                      }}
                    />
                  </figure>
                ) : (
                  <figure>
                    <img
                      alt={section4.image.alt}
                      className='services-image-strategy'
                      src={section4.image.image.publicURL}
                    />
                  </figure>
                )}
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      <section className='section services-filler-mobile-only services-section-container'>
        <div className='container is-max-widescreen'>
          <div className='columns is-vcentered is-mobile'>
            <div className='column is-half services-filler-style'></div>
          </div>
        </div>
      </section>
      <section className='section services-cta-container services-section-container contact'>
        <div className='container is-max-widescreen'>
          <FadeIn configuration={config}>
            <h2 className='services-contact-heading'>{cta.heading}</h2>
            <p className='services-contact-subheading'>{cta.subheading}</p>
            <Link to='/contact'>
              <button className='button dk is-uppercase services-button'>
                {cta.button}
              </button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}

ServicesPageTemplate.propTypes = {
  hero: PropTypes.object,
  section1: PropTypes.object,
  section2: PropTypes.object,
  section3: PropTypes.object,
  section4: PropTypes.object,
  cta: PropTypes.object,
  seo: PropTypes.object,
}

const ServicesPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <ServicesPageTemplate
        hero={frontmatter.hero}
        section1={frontmatter.section1}
        section2={frontmatter.section2}
        section3={frontmatter.section3}
        section4={frontmatter.section4}
        cta={frontmatter.cta}
        seo={frontmatter.seo}
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
        hero {
          heading
          subheading
        }
        section1 {
          heading
          subheadings {
            text
          }
          image {
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
              publicURL
            }
            alt
          }
        }
        section2 {
          heading
          subheadings {
            text
          }
          image {
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
              publicURL
            }
            alt
          }
        }
        section3 {
          heading
          subheadings {
            text
          }
          image {
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
              publicURL
            }
            alt
          }
        }
        section4 {
          heading
          subheadings {
            text
          }
          image {
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
              publicURL
            }
            alt
          }
        }
        cta {
          heading
          subheading
          button
        }
        seo {
          title
          description
          image {
            name
          }
        }
      }
    }
  }
`
