import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { graphql } from 'gatsby'
import { v4 } from 'uuid'
import {useTrail, a} from 'react-spring'

import { useIntersect } from '../components/Utilities'

function Trail({ open, children, ...props }) {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    from: { opacity: 0, x: 20 },
  })
  return (
    <div className="trails-main" {...props}>
      <div>
        {trail.map(({ x, height, ...rest }, index) => (
          <a.div
            key={v4()}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate((x) => `translate3d(0,${x}px,0)`) }}>
            <a.div style={{ height }}>{items[index]}</a.div>
          </a.div>
        ))}
      </div>
    </div>
  )
}

export const AboutPageTemplate = ({
    image,
    title,
    hero,
    topSection,
    bottomSection,
}) => {
  const [open, set] = useState(true)
  const [ref, entry] = useIntersect({ threshold: 1 })
  console.log(topSection.image)
  return (
    <div className="page-padding about-page-container">
      <div className="container is-max-widescreen about-hero-container">
        <Trail open={open} onClick={() => set((state) => !state)}>
            <h1 className="line-header about-line-header">{hero.heading}</h1>
            <p className="about-hero-text">{hero.subheading}</p>
        </Trail>
      </div>
      <section className="about-section-container container is-max-widescreen">
        <div className="about-section-right">
          <div className="about-section-text-left">
            <Trail open={open} onClick={() => set((state) => !state)}>
              <p className="about-paragraph-text">
                  {bottomSection.description1}
              </p>
              <p className="about-paragraph-text">
                  {bottomSection.description2}
              </p>
              <p className="about-paragraph-text">
                  {bottomSection.description3}
              </p>
            </Trail>
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
        <div className="about-section-left">
          <div className="about-section-text-right">
            <Trail open={open} onClick={() => set((state) => !state)}>
              <p className="letter-stroke-dk about-paragraph-text">
                  {topSection.description1}
              </p>
              <p className="about-paragraph-text">
                  {topSection.description2}
              </p>
            </Trail>
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
      </section>
    </div>
)}

AboutPageTemplate.propTypes = {
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
    hero: PropTypes.object,
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
          hero={frontmatter.hero}
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
    }
  }
}
`
