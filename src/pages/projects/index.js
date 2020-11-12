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
          }}
        >
          <div class="container is-max-widescreen">
            <h1 className="line-header">portfolio</h1>
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
              <button class="button is-uppercase">Let's Chat</button>
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
