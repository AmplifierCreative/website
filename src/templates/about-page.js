import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { graphql } from 'gatsby'
import { v4 } from 'uuid'
import {useTrail, a} from 'react-spring'


const heroContainer = {
    backgroundColor: '#2D2C2C',
    marginTop: '0',
    marginBottom: '0',
    height: "400px",
    padding: '5rem 2rem',
}

const heroText = {
  fontFamily: 'EBGaramond',
  fontSize: '1.5em',
  color: '#F8F3F1',
  maxWidth: '750px',
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

const imageBottom = {
  paddingTop: "5em",
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

  return (
    <div style={sectionContainer}>
      <div className="container is-max-widescreen" style={heroContainer}>
        <Trail open={open} onClick={() => set((state) => !state)}>
            <h1 className="line-header" style={lineHeader}>{hero.heading}</h1>
            <p style={heroText}>{hero.subheading}</p>
        </Trail>
      </div>
      <section className="about-section-container container is-max-widescreen">
        <div className="about-section-text-right">
          <Trail open={open} onClick={() => set((state) => !state)}>
            <p className="letter-stroke-dk" style={paragraphText}>
                {topSection.description1}
            </p>
            <p style={paragraphText}>
                {topSection.description2}
            </p>
          </Trail>
        </div>
        <div className="about-border about-section-image-left">
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
        <div className="about-border about-section-text-left">
          <Trail open={open} onClick={() => set((state) => !state)}>
            <p style={paragraphText}>
                {bottomSection.description1}
            </p>
            <p style={paragraphText}>
                {bottomSection.description2}
            </p>
            <p style={paragraphText}>
                {bottomSection.description3}
            </p>
          </Trail>
        </div>
        <div className="about-section-image-right">
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
