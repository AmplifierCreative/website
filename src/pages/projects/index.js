import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../components/Layout'
import ProjectRoll from '../../components/ProjectRoll'

export default class ProjectsIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container has-text-left margin-top-0"
          style={{
            // backgroundImage: `url('/img/blog-index.jpg')`,
            backgroundColor: '#2D2C2C',
            color: 'white',
          }}
        >
          <div class="container is-max-widescreen">
            <h1
              className="line-header"
              style={{
                color: 'white',
              }}
            >
              portfolio
            </h1>
            <br />
            <h2
              style={{
                fontFamily: 'VisbyCF-Regular',
                fontSize: '1.5em',
              }}
            >
              Want to join the list? Let's make something you love.
            </h2>
            <br />
            <Link to="/contact">
              <button
                class="button is-uppercase"
                style={{
                  backgroundColor: '#BA5930',
                  borderWidth: '0px',
                  borderRadius: '0px',
                  color: 'white',
                  letterSpacing: '2px',
                  paddingLeft: '71px',
                  paddingRight: '71px',
                  lineHeight: 1,
                }}
              >
                Let's Chat
              </button>
            </Link>
          </div>
        </div>
        <section className="section">
          <div className="container is-max-widescreen">
            <div className="content">
              <ProjectRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
