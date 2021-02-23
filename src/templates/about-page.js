import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { graphql } from 'gatsby'

import { FadeIn } from '../components/Utilities'
import SEO from '../components/Seo'

const config = { mass: 5, tension: 2000, friction: 200 }

export const AboutPageTemplate = ({
    hero,
    topSection,
    bottomSection,
    seo
}) => {

  return (
    <div className="page-padding about-page-container">
      <SEO 
        title={seo.title}
        description={seo.description}
        image={seo.image.name}
      />
      <div className="container is-max-widescreen about-hero-container">
        <FadeIn configuration={config}>
          <h1 className="line-header about-line-header">{hero.heading}</h1>
        </FadeIn>
        <FadeIn configuration={config} delayStart={100}>
          <p className="hero-text">{hero.subheading}</p>
        </FadeIn>
      </div>
      <section className="about-section-container container is-max-widescreen">
        {/* Two layouts: one for desktop, another below for mobile */}
        <div className="about-section-left">
          <div className="about-section-text-left">
            <FadeIn configuration={config} delayStart={500}>
              <p className="about-paragraph-text">
                  {bottomSection.description1}
              </p>
              <p className="about-paragraph-text">
                  {bottomSection.description2}
              </p>
              <p className="about-paragraph-text">
                  {bottomSection.description3}
              </p>
            </FadeIn>
          </div>
          <div className="about-image-container">
            {topSection.image ? (
              <figure className="about-image">
                <PreviewCompatibleImage
                  imageInfo={{
                    image: topSection.image,
                    }}
                />
              </figure>
            ) : null}
          </div>
        </div>
        <div className="about-section-right">
          <div className="about-section-text-right">
            <FadeIn configuration={config}>
              <p className="letter-stroke-dk about-paragraph-text">
                  {topSection.description1}
              </p>
              <p className="about-paragraph-text">
                  {topSection.description2}
              </p>
            </FadeIn>
          </div>
          <div className="about-image-container">
            {bottomSection.image ? (
                  <figure className="about-image">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: bottomSection.image,
                
                      }}
                    />
                  </figure>
                ) : null}
          </div>
        </div>
        {/* Mobile layout starts here! */}
        <div className="about-section-mobile">
        <div className="about-image-container">
            {topSection.image ? (
              <figure className="about-image">
                <PreviewCompatibleImage
                  imageInfo={{
                    image: topSection.image,
                    }}
                />
              </figure>
            ) : null}
          </div>
          <div className="about-section-text-right">
            <FadeIn configuration={config}>
              <p className="letter-stroke-dk about-paragraph-text">
                  {topSection.description1}
              </p>
              <p className="about-paragraph-text">
                  {topSection.description2}
              </p>
            </FadeIn>
          </div>
          <div className="mobile-line"></div>
          <div className="about-image-container">
            {bottomSection.image ? (
                  <figure className="about-image">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: bottomSection.image,
                
                      }}
                    />
                  </figure>
                ) : null}
          </div>
          <div className="about-section-text-left">
            <FadeIn configuration={config}>
              <p className="about-paragraph-text">
                  {bottomSection.description1}
              </p>
              <p className="about-paragraph-text">
                  {bottomSection.description2}
              </p>
              <p className="about-paragraph-text">
                  {bottomSection.description3}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
)}

AboutPageTemplate.propTypes = {
    hero: PropTypes.object,
    topSection: PropTypes.object,
    bottomSection: PropTypes.object,
    seo: PropTypes.object,
  }

const AboutPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark
  
    return (
      <Layout>
        <AboutPageTemplate
          hero={frontmatter.hero}
          topSection={frontmatter.topSection}
          bottomSection={frontmatter.bottomSection}
          seo={frontmatter.seo}
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
      hero {
        heading
        subheading
      }
      topSection {
          description1
          description2
          image {
            name
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
