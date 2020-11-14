import React from 'react'
import PropTypes from 'prop-types'
import { PrivacyPageTemplate } from '../../templates/privacy-page'

const PrivacyPagePreview = ({ entry, widgetFor }) => (
  <PrivacyPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

PrivacyPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default PrivacyPagePreview
