import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

const circle = {
  border: '1px solid #FAB395',
  webkitBorderRadius: '390px',
  padding: '50px',
  height: '390px',
  width: '390px',
  overflow: 'hidden',
}

const numberText = {
  fontSize: '5em',
  color: '#BA5930',
  marginTop: '60px',
  marginBottom: '0px',
}

const blurbText = {
  fontSize: '2em',
  fontFamily: 'VisbyCF-Regular',
  fontStyle: 'normal',
  fontWeight: 400,
}

const Statistics = ({ statistics }) => (
  <div className="columns statistic-wrapper">
    {statistics.map((statistic) => (
      <div key={v4()} className="column">
        <article className="statistic">
          <div
            className="statistic-body circle has-text-centered"
            style={circle}
          >
            <h2 style={numberText}> {statistic.number}</h2>
            <cite style={blurbText}> {statistic.blurb}</cite>
          </div>
        </article>
      </div>
    ))}
  </div>
)

Statistics.propTypes = {
  statistics: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string,
      blurb: PropTypes.string,
    })
  ),
}

export default Statistics
