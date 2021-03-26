import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import { v4 } from 'uuid'

import { FadeIn } from '../components/Utilities'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
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
          <p className="hero-text">{hero.subheading}</p>
        </FadeIn>
      </div>
      <section className="about-section-container container is-max-widescreen">
        {/* Two layouts: this is desktop --- bottom left paragraph comes first*/}
        <div className="about-section-left">
          <div className="about-section-text-left">
            <FadeIn configuration={config} >
              {bottomSection.subheadings && bottomSection.subheadings.map((item) => (
                <p key={v4()} className="about-paragraph-text">{item.paragraph}</p>
              )) 
              }
            </FadeIn>
          </div>
        <div className="about-image-container">
          <FadeIn configuration={config} >
            {!!topSection.image.image && !!topSection.image.image.childImageSharp 
                ? <figure className="about-image">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: topSection.image.image,
                        alt: topSection.image.alt
                        }}
                    />
                  </figure>
                : <figure>
                  <img alt={topSection.image.alt} className="about-image" src={topSection.image.publicURL}/>
                </figure>}
          </FadeIn>
          </div>
        </div>
        <div className="about-section-right">
          <div className="about-section-text-right">
            <FadeIn configuration={config}>
              <p className="about-paragraph-text letter-stroke-dk">
                  {topSection.subheading1}
              </p>
              {topSection.subheadings && topSection.subheadings.map((item) => (
                <p key={v4()} className="about-paragraph-text">{item.paragraph}</p>
              )) 
              }
            </FadeIn>
          </div>
          <div className="about-image-container">
          <FadeIn configuration={config} >
            {!!bottomSection.image.image && !!bottomSection.image.image.childImageSharp 
                    ? <figure className="about-image">
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: bottomSection.image.image,
                            alt: bottomSection.image.alt
                            }}
                        />
                      </figure>
                    : <figure>
                      <img alt={bottomSection.image.alt} className="about-image" src={bottomSection.image.publicURL}/>
                    </figure>}
          </FadeIn>
          </div>
        </div>
        {/* Mobile layout starts here! */}
        <div className="about-section-mobile">
        <div className="about-image-container">
        <FadeIn configuration={config} >
          {!!topSection.image.image && !!topSection.image.image.childImageSharp 
                  ? <figure className="about-image">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: topSection.image.image,
                          alt: topSection.image.alt
                          }}
                      />
                    </figure>
                  : <figure>
                    <img alt={topSection.image.alt} className="about-image" src={topSection.image.publicURL}/>
                  </figure>}
        </FadeIn>
          </div>
          <div className="about-section-text-right">
            <FadeIn configuration={config}>
              <p className="letter-stroke-dk about-paragraph-text">
                  {topSection.subheading1}
              </p>
              {topSection.subheadings && topSection.subheadings.map((item) => (
                <p key={v4()} className="about-paragraph-text">{item.paragraph}</p>
              )) 
              }
            </FadeIn>
          </div>
          <div className="mobile-line"></div>
          <div className="about-image-container">
          <FadeIn configuration={config} >
          {!!bottomSection.image.image && !!bottomSection.image.image.childImageSharp 
                  ? <figure className="about-image">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: bottomSection.image.image,
                          alt: bottomSection.image.alt
                          }}
                      />
                    </figure>
                  : <figure>
                    <img alt={bottomSection.image.alt} className="about-image" src={bottomSection.image.publicURL}/>
                  </figure>}
          </FadeIn>
          </div>
          <div className="about-section-text-left">
            <FadeIn configuration={config}>
              {bottomSection.subheadings && bottomSection.subheadings.map((item) => (
                <p key={v4()} className="about-paragraph-text">{item.paragraph}</p>
              )) 
              }
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
          subheading1
          subheadings {
            paragraph
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
      bottomSection {
        subheadings {
          paragraph
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
