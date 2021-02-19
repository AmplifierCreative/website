import React from 'react'
import PropTypes from 'prop-types'
import { TermsPageTemplate } from '../../templates/terms-page'

const TermsPagePreview = ({ entry, widgetFor }) => (
  <TermsPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

TermsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default TermsPagePreview
