import React from 'react'
import { useState, useEffect, useRef } from "react";
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

export const VisibilityMonitor = children => {
  const [ref, entry] = useIntersect({ threshold: 1 })

  console.log(entry.isIntersecting)

/*   if (this.props.children instanceof Function) {
    return this.props.children({
      isVisible: this.state.isVisible,
      visibilityRect: this.state.visibilityRect
    });
  }
  return React.Children.only(this.props.children); */
  
  return (
    <div ref={ref} isVisible={entry.isIntersecting}>
     { children }
    </div>
  )
}


