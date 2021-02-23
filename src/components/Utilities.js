import React from 'react'
import { useState, useEffect, useRef } from "react";
import { useSpring, animated, config } from 'react-spring'
import PropTypes from 'prop-types'

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

