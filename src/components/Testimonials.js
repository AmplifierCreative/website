import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

const Testimonials = ({ testimonials }) => (
  <div>
    {testimonials.map((testimonial) => (
      <article key={v4()} className='message'>
        <div className='message-body'>
          <h2 className='project-message-body'> {testimonial.quote}</h2>
          <br />
          <cite>
            {' '}
            <span className='cite-name'>– {testimonial.author} </span>
            <span className='cite-credentials orange-text'>
              {testimonial.authorBio}
            </span>
          </cite>
        </div>
      </article>
    ))}
  </div>
)

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string,
      author: PropTypes.string,
      authorBio: PropTypes.string,
    })
  ),
}

export default Testimonials
