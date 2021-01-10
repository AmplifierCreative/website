import React, { useState } from 'react'
import { useSpring, animated, interpolate } from 'react-spring'
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
  const props = useSpring({ number: Number(_number), from: { number: 0 } })
  return  <animated.h2 style={numberText}>{props.number.interpolate(number => Math.floor(number))}</animated.h2>
}

const Statistics = ({ statistics }) => {

  const [open, toggle] = useState(false)
  
  const {o, color} = useSpring({
    from: {o: 0, color: '#F8F3F1'},
    o: 1,
    color: '#FAB395'
  })

  return ( 
    <section className="statistic-wrapper">
      <div className="columns">
        {statistics.map((statistic) => (
          <div key={v4()} className="column">
            <article className="statistic">
              <animated.div
                className="statistic-body circle has-text-centered"
                style={{ border: interpolate([o, color], (o, c) => `${o * 2}px solid ${c}`),}}
                onClick={() => toggle(!open)}
              >     
                <AnimatedValue _number={statistic.number}/>
                <cite style={blurbText}> {statistic.blurb}</cite>
              </animated.div>
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
