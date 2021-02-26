import React, { useState, useEffect, useMemo } from 'react'
import { useSpring, animated, config } from 'react-spring'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

import { useIntersect } from './Utilities'

const AnimatedValue =  ({ _number }) => {
  const [ref, entry] = useIntersect({ threshold: 0.5 }) 
  const [view, setView] = useState(false)

  const props = useSpring({ 
    number: view ? Number(_number) :  0,
    config: config.stiff 
  })

  useEffect(
    () => {
      if (view) return
      console.log(_number)
      if (entry.isIntersecting) setView(true)
    },
    [entry.isIntersecting]
  );

  return (
    <div ref={ref}>
    <animated.h2 id="stats-number-text" >
      {props.number.interpolate(number => Math.floor(number))}
    </animated.h2>
    </div>
  )
}

React.memo(AnimatedValue)

const Statistics = ({ statistics }) => {
  const [ref, entry] = useIntersect({ threshold: 0.5 }) 
  const [view, setView] = useState(false)

  const dashProps = useSpring({ x: view ? 0 : 1000, config: config.molasses })

  useEffect(
    () => {
      if (view) return 
      console.log("stats called")
      if (entry.isIntersecting) setView(true)
    },
    [entry.isIntersecting]
  );

  return ( 
    <section className="statistic-wrapper" ref={ref}>
      <div className="columns">
        {statistics.map((statistic) => (
          <div key={v4()} className="column">
            <article className="statistic">
              <animated.svg viewBox="45 45 215 215" strokeDashoffset={dashProps.x} className="svg-circle-container"> 
                <circle cx="150" cy="150" r="100" transform="rotate(90 150 150)" className="svg-circle" />
              </animated.svg>
              <div
                className="statistic-body circle has-text-centered"
              > 
                <AnimatedValue _number={statistic.number} />
                <cite className="stats-blurb-text"> {statistic.blurb}</cite>
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
