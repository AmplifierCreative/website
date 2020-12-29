import React from 'react'
import PropTypes from 'prop-types'
import { NotFoundPageTemplate } from '../../templates/notFound-page'

const NotFoundPagePreview = ({ entry, widgetFor, getAsset }) => {
    const data = entry.getIn(['data']).toJS()

    if (data) {
        return (
            <NotFoundPageTemplate
                title={data.title}
                content={widgetFor('body')}
                useImage={data.useImage}
                image={getAsset(data.image)}
            />
        )
    } else {
        return <div>Loading...</div>
        }
}

NotFoundPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  getAsset: PropTypes.func,
}

export default NotFoundPagePreview
