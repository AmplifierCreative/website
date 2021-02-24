import React from 'react'
import { useState, useEffect, useRef } from "react";
import { useSpring, useTrail, animated, config } from 'react-spring'
import { Trail, animated as a } from 'react-spring/renderprops'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

export const useIntersect = ({ root = null, rootMargin, threshold = 0 }) => {
  const [entry, updateEntry] = useState({});
  const [node, setNode] = useState(null);

  const observer = useRef(null);

  useEffect(
    () => {
      if (observer.current) observer.current.disconnect();

      observer.current = new window.IntersectionObserver(
        ([entry]) => updateEntry(entry),
        {
          root,
          rootMargin,
          threshold
        }
      );

      const { current: currentObserver } = observer;

      if (node) currentObserver.observe(node);

      return () => currentObserver.disconnect();

    },
    [node, root, rootMargin, threshold]
  );

  return [setNode, entry];
}

export const VisibilityMonitor = ({ isVisible, children }) => {
  const [ref, entry] = useIntersect({ threshold: 1, rootMargin: '200px' })

  console.log(entry.isIntersecting)
  
  return (
    <div ref={ref} onClick={() => isVisible(entry.isIntersecting)}>
      {entry.isIntersecting ? children : null }
    </div>
  )
}

export const FadeIn = ({ configuration, delayStart, children }) => {
  const [ref, entry] = useIntersect({ threshold: 0.5 }) 
  const [view, setView] = useState(false)

  const props = useSpring({
    to: { opacity: view ? 1 : 0, 
          transform: view ? 'translate3d(0,0,0)' : 'translate3d(0,60px,0)' 
        },
    config: configuration || config.slow,
    delay: delayStart || null,
  })

  useEffect(
    () => {
      if (entry.isIntersecting) setView(true)
    },
    [entry.isIntersecting]
  );

  return (
    <animated.div ref={ref} style={props}>
      {children}
    </animated.div>
  )
}

export const TrailsWrapper = ({ configuration, delayStart, children }) => {

  function Trail({ open, children, ...props }) {
    const items = React.Children.toArray(children)
    const trail = useTrail(items.length, {
      config: configuration || { mass: 5, tension: 2000, friction: 200 },
      opacity: open ? 1 : 0,
      y: open ? 0 : 20,
      from: { opacity: 0, y: 20 },
      delay: delayStart || null,
    })
    return (
      <div className="trails-main" {...props}>
        <div>
          {trail.map(({ y, height, ...rest }, index) => (
            <a.div
              key={v4()}
              className="trails-text"
              style={{ ...rest, transform: y.interpolate((y) => `translate3d(0,${y}px,0)`) }}>
              <a.div style={{ height }}>{items[index]}</a.div>
            </a.div>
          ))}
        </div>
      </div>
    )
  }

  const [ref, entry] = useIntersect({ threshold: 0.5 }) 
  const [view, setView] = useState(false)

  useEffect(
    () => {
      if (entry.isIntersecting) setView(true)
    },
    [entry.isIntersecting]
  );

  return (
    <Trail ref={ref}>
      {children}
    </Trail>
  )
}
