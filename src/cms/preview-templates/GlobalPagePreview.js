import React from 'react'
import PropTypes from 'prop-types'
import { GlobalPageTemplate } from '../../templates/global-page'

const GlobalPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <GlobalPageTemplate
        title={data.title}
        footer={data.footer}
        nav={data.nav}
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
  getAsset: PropTypes.func,
}

export default GlobalPagePreview
