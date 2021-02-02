import React from 'react'
import { useSpring, animated, config } from 'react-spring'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'


const numberText = {
  fontSize: '5em',
  color: '#BA5930',
  marginTop: '60px',
  marginBottom: '0px',
}

const blurbText = {
  fontSize: '1.8em',
  fontFamily: 'VisbyCF-Regular',
  fontStyle: 'normal',
  fontWeight: 400,
}

const AnimatedValue = ({ _number }) => {
  const props = useSpring({ number: Number(_number), from: { number: 0 }, config: config.molasses })
  return  <animated.h2 style={numberText}>{props.number.interpolate(number => Math.floor(number))}</animated.h2>
}

const Statistics = ({ statistics }) => {

  const props = useSpring({ x: 0, from: { x: 1000 }, config: config.molasses })

  return ( 
    <section className="statistic-wrapper">
      <div className="columns">
        {statistics.map((statistic) => (
          <div key={v4()} className="column">
            <article className="statistic">
              <animated.svg viewBox="45 45 215 215" strokeDashoffset={props.x} className="svg-circle-container">               >
                <circle cx="150" cy="150" r="100" transform="rotate(90 150 150)" className="svg-circle" />
              </animated.svg>
              <div
                className="statistic-body circle has-text-centered"
              > 
                <AnimatedValue _number={statistic.number}/>
                <cite style={blurbText}> {statistic.blurb}</cite>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )}

Statistics.propTypes = {
  statistics: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string,
      blurb: PropTypes.string,
    })
  ),
}

export default Statistics
