import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Carousel from '../components/Carousel'
import SEO from '../components/Seo'

const headerStyle = {
  backgroundColor: '#2D2C2C',
}

export const IndexPageTemplate = ({
  hero,
  about,
  services,
  clients,
  seo
}) => {
  return (
    <div>
      <SEO 
        title={seo.title}
        description={seo.description}
        image={seo.image.name}
      />
      <section
      style={ hero.image ?
        {backgroundImage: `url(${
          !!hero.image.childImageSharp ? hero.image.childImageSharp.fluid.src : hero.image
        })`} : headerStyle
      }
      className="hero is-medium page-padding">
        <div className="hero-body">
          <div className="container is-max-widescreen">
            <h1 className="home-header-text">
              {hero.heading}
            </h1>
            <h2 className="hero-subheading-a">
              {hero.subheading}
            </h2>
            <h2 className="hero-subheading-a">
              {hero.description}
            </h2>
          </div>
        </div>
      </section>
      <div className="container home-page-container is-max-widescreen">
        <section
          className="section--gradient home-about-section home-section-container"
        >
          <div className="section">
            <div className="columns is-vcentered">
              <div className="column is-6 has-text-centered home-section-mobile-padding">
                <div className="columns is-mobile">
                  <div className="column is-2">
                    <h4
                      className="home-sideways-title about"
                    >
                      {about.title}
                    </h4>
                  </div>
                  <div className="column is-9">
                    <h6 className='home-orange-header' >xx</h6>
                    <h2 className="home-about-heading">{about.heading}</h2>
                    <h3 className="home-section-subheading" >{about.subheading}</h3>
                  </div>
                </div>
              </div>
              <div className="column is-6">
                <p className="first-letter-stroke home-about-description" >
                  {about.description1}
                </p>
                <p className="home-about-description home-about-margin" >{about.description2}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="home-section home-section-container">
          <div className="section">
            <div className="columns is-vcentered">
              <div className="column is-12 has-text-centered home-section-mobile-padding">
                <div className="columns is-mobile">
                  <div className="column is-2">
                    <h4
                      className="home-sideways-title services"
                    >
                      {services.title}
                    </h4>
                  </div>
                  <div className="column is-9">
                    <h6 className="home-orange-header">xx</h6>
                    <h3 className="home-section-subheading" >{services.heading}</h3>
                    <h3 className="home-services-description">{services.subheading1}</h3>
                    <h3 className="home-services-description">{services.subheading2}</h3>
                    <h3 className="home-services-description">{services.subheading3}</h3>
                    <h3 className="home-services-description">{services.subheading4}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="home-section home-client-section home-section-container"
        >
          <div className="columns is-mobile is-vcentered">
            <div className="column is-2 has-text-centered home-section-mobile-padding">
              <h4 className="home-sideways-title clients">
                {clients.title}
              </h4>
            </div>
            <div className="column is-9 has-text-centered">
              <h6 className="home-orange-header">xx</h6>
              <h5 className="home-client-heading">{clients.heading}</h5>
              <Carousel />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

IndexPageTemplate.propTypes = {
  hero: PropTypes.object,
  about: PropTypes.object,
  services: PropTypes.object,
  clients: PropTypes.object,
  seo: PropTypes.object,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        hero={frontmatter.hero}
        about={frontmatter.about}
        services={frontmatter.services}
        clients={frontmatter.clients}
        seo={frontmatter.seo}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        hero {
          heading
          subheading
          description
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        about {
          title
          heading
          subheading
          description1
          description2
        }
        services {
          title
          heading
          subheading1
          subheading2
          subheading3
          subheading4
        }
        clients {
          title
          heading
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
