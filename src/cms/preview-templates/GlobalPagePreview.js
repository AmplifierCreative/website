import React from 'react'
import PropTypes from 'prop-types'
import { GlobalPageTemplate } from '../../templates/global-page'

const GlobalPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <GlobalPageTemplate
        footer={data.footer}
        nav={data.nav}
        content={widgetFor('body')}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

GlobalPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default GlobalPagePreview
