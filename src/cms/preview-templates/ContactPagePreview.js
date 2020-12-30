import React from 'react'
import PropTypes from 'prop-types'
import ContactPageTemplate from '../../templates/contact-page'

const ContactPagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <ContactPageTemplate
        title={data.title}
        heading={data.heading}
        description={data.description}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

ContactPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default ContactPagePreview
