import React from 'react'
import PropTypes from 'prop-types'
import { ServicesPageTemplate } from '../../templates/services-page'

const ServicesPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <ServicesPageTemplate
        image={getAsset(data.image)}
        title={data.title}
        hero={data.hero}
        section1={data.section1}
        section2={data.section2}
        section3={data.section3}
        section4={data.section4}
        cta={data.cta}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

ServicesPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default ServicesPagePreview