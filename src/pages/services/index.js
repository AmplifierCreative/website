import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

const heroContainer = {
    backgroundColor: '#2D2C2C',
    marginTop: '0',
    marginBottom: '0',
}

const heroText = {
    fontFamily: 'EBGaramond',
    fontSize: '1.5em',
    color: '#F8F3F1',
    maxWidth: '1000px',
}

const sectionContainer = {
    backgroundColor: '#2D2C2C',
    paddingTop: '0',
}

const titleText = {
    fontFamily: 'VisbyCF-Bold',
    fontWeight: '800',
    fontSize: '2.25em',
    color: '#F8F3F1',
    lineHeight: '2.5em',
    letterSpacing: '1px',
}

const paragraphText = {
    fontFamily: 'EBGaramond',
    fontSize: '1.5em',
    color: '#F8F3F1',
    lineHeight: '2em',
}

const fillerStyle = {
    borderRight: '2px solid #BA5930',
    height: '300px',
    marginTop: '3em',
    marginBottom: '3em',
}

const sectionContainerBottom = {
    backgroundColor: '#2D2C2C',
    paddingTop: '0',
    paddingBottom: '15.5em',
}

const sectionContainerContact = {
    backgroundColor: '#2D2C2C',
    paddingTop: '0',
    paddingBottom: '10em',
}

const contactText = {
    fontFamily: 'VisbyCF-Regular',
    fontSize: '2.25em',
    color: '#F8F3F1',
}

const buttonStyle = {
    width: "244px",
    height: "51px",
  }

const ServicesIndexPage = ({
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
        <h1 className="line-header">services</h1>
        <p
          style={heroText}
        >
          Long story short: Our services are tailored to your needs, so pricing ranges—but there’s no task too small or too big. Because at the end of the day, your success is our passion—and we want to be a part of your journey. 
        </p>
        <br />
 
      </div>
    </div>
    <section className="section" style={sectionContainer}>
      <div className="container">
        <div className="columns is-vcentered">
            <div className="column is-half"></div>
            <div className="column is-half ">
                <h2 style={titleText}>Copywriting + editing</h2>
                <p style={paragraphText}>
                Landing and product page copy<br/>
                SEO-first articles<br/>
                Marketing content <br/>
                Emails and newsletters<br/>
                Press releases<br/>
                Brand campaign copy<br/>
                Social media copy<br/>
                Naming
                </p>
            </div>
        </div>
      </div>
    </section>
    <section className="section" style={sectionContainer}>
      <div className="container is-max-widescreen">
        <div className="columns is-vcentered">
            <div className="column is-half" style={fillerStyle}>
            </div>
        </div>
      </div>
    </section>
    <section className="section" style={sectionContainer}>
      <div className="container">
        <div className="columns is-vcentered">
            <div className="column is-half has-text-right">
                <h2 style={titleText}>Design</h2>
                <p style={paragraphText}>
                    Video and animation<br/>
                    Photography<br/>
                    Illustration<br/>
                    Branding and logo design<br/>
                    Image sourcing and editing<br/>
                    Email and newsletter templates<br/>
                    Social media assets
                </p>
            </div>
        </div>
      </div>
    </section>
    <section className="section" style={sectionContainer}>
      <div className="container is-max-widescreen">
        <div className="columns is-vcentered">
            <div className="column is-half" style={fillerStyle}>
            </div>
        </div>
      </div>
    </section>
    <section className="section" style={sectionContainer}>
      <div className="container">
        <div className="columns is-vcentered">
            <div className="column is-half"></div>
            <div className="column is-half ">
                <h2 style={titleText}>Social</h2>
                <p style={paragraphText}>
                Social media content planning and creation<br/>
                Social media reporting<br/>
                Social media strategy<br/>
                Community management<br/>
                Social media trends and insights 
                </p>
            </div>
        </div>
      </div>
    </section>
    <section className="section" style={sectionContainer}>
      <div className="container is-max-widescreen">
        <div className="columns is-vcentered">
            <div className="column is-half" style={fillerStyle}>
            </div>
        </div>
      </div>
    </section>
    <section className="section" style={sectionContainerBottom}>
      <div className="container">
        <div className="columns is-vcentered">
            <div className="column is-half has-text-right">
                <h2 style={titleText}>Strategy</h2>
                <p style={paragraphText}>
                    SEO research and strategy<br/>
                    Digital marketing strategy<br/>
                    Content marketing strategy and planning<br/>
                    Brand strategy development<br/>
                    Integrated marketing campaign strategy
                </p>
            </div>
        </div>
      </div>
    </section>
    <section className="section" style={sectionContainerContact}>
      <div className="container is-max-widescreen">
        <div className="content">
            <p style={contactText}>
            See something you like? Let’s chat over coffee. (We’re buying.)
            </p>
        <Link to="/contact">
            <button class="button is-uppercase" style={buttonStyle}>Contact us</button>
        </Link>
        </div>
      </div>
    </section>

  </Layout>
)

export default ServicesIndexPage

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
