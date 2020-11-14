import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'
import ProjectRoll from '../../components/ProjectRoll'
import { kebabCase } from 'lodash'
import ProjectsFilter from './filter'
import ProjectsHero from './hero'

const ProjectsIndexPage = () => (
  <Layout>
    <ProjectsHero />
    <ProjectsFilter />
    <section className="section">
      <div className="container is-max-widescreen">
        <div className="content">
          <ProjectRoll />
        </div>
      </div>
    </section>
  </Layout>
)

export default ProjectsIndexPage
