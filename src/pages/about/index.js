import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

const heroContainer = {
    backgroundColor: '#2D2C2C',
    marginTop: '0',
    marginBottom: '0',
    height: "300px",
}

const sectionContainer = {
    backgroundColor: '#2D2C2C',
    paddingTop: '0',
    paddingBottom: '10em',
}

const fillerA = {
    height: '700px',
}

const fillerB = {
    height: '800px',
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

const divider = {
    borderRight: '2px solid #BA5930',
}

const AboutIndexPage = ({
  /* data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  }, */
}) => (
  <Layout>
    <div
      className="full-width-image-container has-text-left"
      style={heroContainer}
    >
      <div class="container is-max-widescreen">
        <h1 className="line-header">about</h1>
      </div>
    </div>
    <section className="section" style={sectionContainer}>
        <div className="container is-max-widescreen">
            <div className="columns is-vcentered">
                {/* <div>
                image will go here aboslute positioned over top & parent div will be set to relative 
                </div> */}
                <div className="column is-half" style={divider}>
                    <div className="columns" style={fillerA}></div>
                    <div className="columns">
                        <div className="column has-text-right">
                            <p style={paragraphText}>
                            What once was a completely volunteer-run magazine is now a creative agency operated by a copy + design duo with the same vision in mind as our small magazine: to support and uplift businesses, entrepreneurs, and creative endeavors that are deserving of success and recognition.<br style={paragraphBreak}/>
                            Since the beginning of our careers, we’ve been the workhorses—not the show ponies. The ones who pick up the slack, put the pieces back together, ground creative in strategy, and stick up for the work we believe in no matter what it takes.<br style={paragraphBreak}/>
                            Now, it’s our turn to call the shots—and do it in a more meaningful way than before.
                            </p>
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
                    <div className="columns" style={fillerB}></div>
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
