import React from 'react'
import Layout from '../../components/Layout'

import hollie from '../../img/Hollie-Bio.png'
import jen from '../../img/Jen-Bio.png'

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

const hollieContainer = {
    height: '550px',
}

const jenContainer = {
  height: '650px',
}

const jenPadding = {
  paddingTop: "10em",
}

const paragraphText = {
    fontFamily: 'EBGaramond',
    fontSize: '1.5em',
    color: '#F8F3F1',
    lineHeight: '1.65em',
}

const paragraphBreak = {
    margin: '9px',
}

const AboutIndexPage = (/* {
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
} */) => (
  <Layout>
    <div
      className="has-text-left"
      style={heroContainer}
    >
      <div class="container is-max-widescreen">
          <h1 className="line-header" style={lineHeader}>about</h1>
      </div>
    </div>
    <section className="about-section-container">
      <div className="container is-max-widescreen">
        <div className="columns services-reverse-column is-vcentered">
          <div className="column is-half about-border">
              <div className="columns about-img-container" style={hollieContainer}>
                <figure className="">
                  <img alt="An illustration of Hollie" src={hollie}/>
                </figure>  
              </div>
              <div className="columns">
                  <div className="column has-text-right about-column-mobile">
                      <p style={paragraphText}>
                      What once was a completely volunteer-run magazine is now a creative agency operated by a copy + design duo with the same vision in mind as our small magazine: to support and uplift businesses, entrepreneurs, and creative endeavors that are deserving of success and recognition.<br style={paragraphBreak}/>
                      Since the beginning of our careers, we’ve been the workhorses—not the show ponies. The ones who pick up the slack, put the pieces back together, ground creative in strategy, and stick up for the work we believe in no matter what it takes.<br style={paragraphBreak}/>
                      Now, it’s our turn to call the shots—and do it in a more meaningful way than before.
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
                    You may know us from our zine days—and if so, we’re so glad you’ve found your way back to us. Thanks to people like you, who supported us endlessly through five gracious years, we were able to start our careers doing what we love to do. <br style={paragraphBreak}/>
                    Since then, we’ve worked diligently at creative agencies, magazines, and brands—all while freelancing into the night. Why? Because we’re passionate about the work we do and driven to achieve something even greater. And, now—we found it. 
                    </p>
                </div>
            </div>
            <div className="columns about-img-container" style={jenContainer}>
              <figure className="" style={jenPadding}>
                <img alt="An illustration of Jen" src={jen}/>
              </figure>  
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default AboutIndexPage

/* export const projectsPageQuery = graphql`
  query ProjectTagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
` */
