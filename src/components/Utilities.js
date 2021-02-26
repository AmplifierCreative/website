import React from 'react'
import { useState, useEffect, useRef } from "react";
import { useSpring, useTrail, animated, config } from 'react-spring'
import PropTypes, { element } from 'prop-types'
import { v4 } from 'uuid'
import { rest } from 'lodash';

/* Custom hook to check if element has entered the viewport  */

export const useIntersect = ({ root = null, rootMargin, threshold }) => {
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

/* Lifts state up to let parent component know when an element has entered the viewport */

export const VisibilityMonitor = ({ isVisible, children }) => {
  const [ref, entry] = useIntersect({ threshold: 1, rootMargin: '200px' })
  
  return (
    <div ref={ref} onClick={() => isVisible(entry.isIntersecting)}>
      {entry.isIntersecting ? children : null }
    </div>
  )
}

/* Wraps any element(s) and applies a React spring animation to fade in and translate up */

export const FadeIn = ({ configuration, gate, delayStart, children }) => {
  const [ref, entry] = useIntersect({ threshold: gate || 0.5 }) 
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
      if (view) return
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

/* This function iterates through react children to apply trails animation */

export const TrailsWrapper = ({ configuration, gate, delayStart, children }) => {

  const [ref, entry] = useIntersect({ threshold: gate || 0.5 }) 
  const [view, setView] = useState(false)

  const items = React.Children.toArray(children)

  const trail = useTrail(items.length, {
    config: configuration || config.molasses,
    opacity: view ? 1 : 0,
    y: view ? 0 : 20,
    delay: delayStart || null,
  })

    useEffect(
      () => {
        if (view) return
        if (entry.isIntersecting) setView(true)
      },
      [entry.isIntersecting]
    );

    return (
        <div ref={ref}>
          <Trail trailProps={trail} >
            {children}
          </Trail>
        </div>
    )
}

/* Helper function for above component */

function Trail({ trailProps, children }) {
  const items = React.Children.toArray(children)
  return (
      <React.Fragment>
        {trailProps.map(({ y, ...rest }, index) => (
          <animated.div
            key={v4()}
            style={{...rest, transform: y.interpolate((y) => `translate3d(0,${y}px,0)`) }}>
            {items[index]}
          </animated.div>
        ))}
      </React.Fragment>
  )
}