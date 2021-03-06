import React from 'react'
import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import { FadeIn, TrailsWrapper } from '../components/Utilities'

import social from '../img/social.gif'
import copywrite from '../img/copywrite.gif'
import design from '../img/design.gif'
import strategy from '../img/strategy.gif'

const config = { mass: 5, tension: 2000, friction: 200 }

export const ServicesPageTemplate = ({
  hero,
  section1,
  section2,
  section3,
  section4,
  cta,
  seo
}) => {
  return (
    <div className="services-container page-padding">
      <SEO 
        title={seo.title}
        description={seo.description}
        image={seo.image.name}
      />
      <div className="services-hero-container has-text-left">
        <div className="container is-max-widescreen">
          <FadeIn configuration={config}>
            <h1 className="line-header">
              {hero.heading}
            </h1>
            <p className="hero-text">{hero.subheading}</p>
          </FadeIn>
        </div>
      </div>
      <section className="section services-section-container" >
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-half has-text-right services-column-mobile">
              <FadeIn configuration={config}>
                <figure>
                  <img alt="Design Illustration of hands" className="services-image-copywrite" src={copywrite}/>
                </figure>
              </FadeIn>
            </div>
            <div className="column is-half services-column-mobile">
              <TrailsWrapper configuration={config}>
                <h2 className="services-title-text">{section1.heading}</h2>
                <p className="services-paragraph-text">{section1.description1}</p>
                <p className="services-paragraph-text">{section1.description2}</p>
                <p className="services-paragraph-text">{section1.description3}</p>
                <p className="services-paragraph-text">{section1.description4}</p>
                <p className="services-paragraph-text">{section1.description5}</p>
                <p className="services-paragraph-text">{section1.description6}</p>
                <p className="services-paragraph-text">{section1.description7}</p>
                <p className="services-paragraph-text">{section1.description8}</p>
              </TrailsWrapper>
            </div>
          </div>
        </div>
      </section>
      <section className="section services-section-container">
        <div className="container is-max-widescreen">
          <div className="columns is-vcentered is-mobile">
            <div className="column is-half services-filler-style"></div>
          </div>
        </div>
      </section>
      <section className="section services-section-container">
        <div className="container">
          <div className="columns is-vcentered services-reverse-column">
            <div className="column is-half has-text-right services-column-mobile">
              <TrailsWrapper configuration={config}>
                <h2 className="services-title-text">{section2.heading}</h2>
                <p className="services-paragraph-text">{section2.description1}</p>
                <p className="services-paragraph-text">{section2.description2}</p>
                <p className="services-paragraph-text">{section2.description3}</p>
                <p className="services-paragraph-text">{section2.description4}</p>
                <p className="services-paragraph-text">{section2.description5}</p>
                <p className="services-paragraph-text">{section2.description6}</p>
                <p className="services-paragraph-text">{section2.description7}</p>
              </TrailsWrapper>
            </div>
            <div className="column is-half services-column-mobile">
              <FadeIn configuration={config}>
                <figure>
                  <img
                    alt="An illustration of hands weaving chakra"
                    className="services-image-design"
                    src={design}
                  />
                </figure>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      <section className="section services-section-container">
        <div className="container is-max-widescreen">
          <div className="columns is-vcentered is-mobile">
            <div className="column is-half services-filler-style"></div>
          </div>
        </div>
      </section>
      <section className="section services-section-container">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-half has-text-right services-column-mobile">
              <FadeIn configuration={config}>
                <figure>
                  <img
                    alt="An animated illustration of hands using a phone"
                    className="services-image-social"
                    src={social}
                  />
                </figure>
              </FadeIn>
            </div>
            <div className="column is-half services-column-mobile">
              <TrailsWrapper configuration={config}>
                <h2 className="services-title-text">{section3.heading}</h2>
                <p className="services-paragraph-text">{section3.description1}</p>
                <p className="services-paragraph-text">{section3.description2}</p>
                <p className="services-paragraph-text">{section3.description3}</p>
                <p className="services-paragraph-text">{section3.description4}</p>
                <p className="services-paragraph-text">{section3.description5}</p>
              </TrailsWrapper>
            </div>
          </div>
        </div>
      </section>
      <section className="section services-section-container" >
        <div className="container is-max-widescreen">
          <div className="columns is-vcentered is-mobile">
            <div className="column is-half services-filler-style"></div>
          </div>
        </div>
      </section>
      <section
        className="section services-strategy-section services-section-container"
      >
        <div className="container ">
          <div className="columns is-vcentered services-reverse-column">
            <div className="column is-half has-text-right services-column-mobile">
              <TrailsWrapper configuration={config}>
                <h2 className="services-title-text">{section4.heading}</h2>
                <p className="services-paragraph-text">{section4.description1}</p>
                <p className="services-paragraph-text">{section4.description2}</p>
                <p className="services-paragraph-text">{section4.description3}</p>
                <p className="services-paragraph-text">{section4.description4}</p>
                <p className="services-paragraph-text">{section4.description5}</p>
              </TrailsWrapper>
            </div>
            <div className="column is-half services-column-mobile">
              <FadeIn configuration={config}>
                <figure>
                  <img
                    alt="An animated illustration of hands pointing at a chart"
                    className="services-image-strategy"
                    src={strategy}
                  />
                </figure>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section services-filler-mobile-only services-section-container"
      >
        <div className="container is-max-widescreen">
          <div className="columns is-vcentered is-mobile">
            <div className="column is-half services-filler-style"></div>
          </div>
        </div>
      </section>
      <section
        className="section services-cta-container services-section-container contact"
      >
        <div className="container is-max-widescreen">
          <div className="content">
            <FadeIn configuration={config}>
              <p className="services-contact-button">{cta.heading}</p>
              <Link to="/contact">
                <button className="button dk is-uppercase services-button">
                  {cta.button}
                </button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}

ServicesPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
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
          description1
          description2
          description3
          description4
          description5
          description6
          description7
          description8
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
        }
        cta {
          heading
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
