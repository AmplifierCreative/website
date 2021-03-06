import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { navigate } from 'gatsby-link'
import { Helmet } from 'react-helmet'
import Select from 'react-select'

import Layout from '../components/Layout'
import SEO from '../components/Seo'

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    border: '1px solid #2D2C2C',
    borderRight: 'none',
    borderLeft: 'none',
    backgroundColor: state.isSelected ? '#BA5930' : '#FAB395',
    color: '#2D2C2C',
    padding: 0,
    paddingTop: 40,
    height: 110,
    fontFamily: 'VisbyCF-Regular',
    textTransform: 'uppercase',
    fontSize: '1.05rem',
    fontWeight: '500',
    letterSpacing: '.15rem',
    textAlign: 'center'

  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '100%',
  }),
  menuList: () => ({
    padding: 0,
  }),
  placeholder: (provided) => ({
    ...provided,
    width: '100%',
    textAlign: 'center',
  }),
  menu: (provided) => ({
    ...provided,
    margin: 0,
  }),
  control: () => ({
    width: '100%',
    height: 111,
    color: '#FAB395',
    fontFamily: 'VisbyCF-Regular',
    textTransform: 'uppercase',
    fontSize: '1.05rem',
    textAlign: 'center'
  }),
  singleValue: (provided) => ({
    ...provided,
    width: '100%',
    textAlign: 'center',
    color: '#2D2C2C',
  }),
}

export const ContactPageTemplate = ({ 
  heading, 
  description,
  seo,
}) => {

  const [ values, setValues ] = useState([])

  const handleChange = (e) => {
    e.persist();
    setValues( values => ({...values, [e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...values,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  const options = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'text', label: 'Text' }
  ]


  return (
    <React.Fragment>
      <Helmet>
        <body className="menu-color-2" />
      </Helmet>
      <SEO 
        title={seo.title}
        description={seo.description}
        image={seo.image.name}
      />
      <section className="contact-container page-padding">
        <div className="container is-max-widescreen">
          <div className="columns">
            <div className="column is-half contact-column-left">
              <p className="contact-info-text">{heading}</p>
              <p className="contact-info-text--small">{description}</p>
            </div>
            <div className="column is-half contact-form-container">
              <div className="content">
                <form
                  name="contact"
                  method="post"
                  action="/contact/thanks/"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                >
                  <div className="contact-page-form">
                    {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                    <input type="hidden" name="form-name" value="contact" />
                    <div hidden>
                      <label>
                        Don’t fill this out:{' '}
                        <input
                          name="bot-field"
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    <div className="contact-form-row">
                      <div className="field contact-field-container-half right">
                        <label
                          className="label contact-hidden-label"
                          htmlFor={'name'}
                        >
                          Your name
                        </label>
                        <div className="control contact-input-container ">
                          <input
                            className="input contact-form-input"
                            type={'text'}
                            name={'name'}
                            onChange={handleChange}
                            id={'name'}
                            required={false}
                            placeholder={'name'}
                          />
                        </div>
                      </div>
                      <div className="field contact-field-container-half">
                        <label
                          className="label contact-hidden-label"
                          htmlFor={'business'}
                        >
                          Business
                        </label>
                        <div className="control contact-input-container" >
                          <input
                            className="input contact-form-input"
                            type={'text'}
                            name={'business'}
                            onChange={handleChange}
                            id={'business'}
                            required={false}
                            placeholder={'business'}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="contact-form-row">
                      <div className="field contact-field-container-full">
                        <label
                          className="label contact-hidden-label"
                          htmlFor={'email'}
                        >
                          Email
                        </label>
                        <div className="control contact-input-container">
                          <input
                            className="input contact-form-input"
                            type={'email'}
                            name={'email'}
                            onChange={handleChange}
                            id={'email'}
                            required={true}
                            placeholder={'email'}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="contact-form-row">
                      <div className="field contact-field-container-half right">
                        <label
                          className="label contact-hidden-label"
                          htmlFor={'phone'}
                        >
                          Phone
                        </label>
                        <div className="control contact-input-container">
                          <input
                            className="input contact-form-input"
                            type={'tel'}
                            name={'phone'}
                            onChange={handleChange}
                            id={'phone'}
                            required={false}
                            placeholder={'phone'}
                          />
                        </div>
                      </div>
                      <div className="field contact-field-container-half">
                        <label
                          className="label contact-hidden-label"
                          htmlFor={'location'}
                        >
                          City and State
                        </label>
                        <div className="control contact-input-container">
                          <input
                            className="input contact-form-input"
                            type={'text'}
                            name={'location'}
                            onChange={handleChange}
                            id={'location'}
                            required={false}
                            placeholder={'City x State'}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="contact-form-row">
                      <div className="field contact-field-container-full">
                        <label
                          className="label contact-hidden-label"
                          htmlFor={'method'}
                        >
                          Do you prefer:
                        </label>
                        <div className="contact-input-container">
                          <div className="form-select contact-select-container">
                            {/* <select
                              className="contact-select"
                              name={'method'}
                              id={'method'}
                            >
                              <option className="contact-option" value="" disabled selected hidden>
                                Do you prefer:
                              </option>
                              <option value="email">Email</option>
                              <option value="phone">Phone</option>
                              <option value="text">Text</option>
                            </select> */}
                            <Select 
                              options={options} 
                              label="Do you prefer:"
                              styles={customStyles}
                              isSearchable={false}
                              maxMenuHeight={700}
                              placeholder={<span className="contact-select-custom">Do you prefer:</span>} 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="contact-form-text-area">
                      <div className="field contact-field-container-full">
                        <label
                          className="label contact-hidden-label"
                          htmlFor={'message'}
                        >
                          Message
                        </label>
                        <div className="control contact-input-container\">
                          <textarea
                            className="textarea contact-form-input contact-text-area"
                            name={'message'}
                            onChange={handleChange}
                            id={'message'}
                            required={false}
                            placeholder={'Service(s) you’re interested in'}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="contact-form-row--bottom">
                      <div className="field contact-field-container-full">
                        <label
                          className="label contact-hidden-label"
                          htmlFor={'dog'}
                        >
                          Your dog’s name
                        </label>
                        <div className="control contact-input-container">
                          <input
                            className="input contact-form-input"
                            type={'text'}
                            name={'dog'}
                            onChange={handleChange}
                            id={'dog'}
                            required={false}
                            placeholder={'Your dog’s name'}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field contact-button-container">
                    <button
                      className="button contact-button"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>                        
  )
}

ContactPageTemplate.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  seo: PropTypes.object,
}

const ContactPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <ContactPageTemplate
        heading={frontmatter.heading}
        description={frontmatter.description}
        seo={frontmatter.seo}
      />
    </Layout>
  )
}

ContactPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ContactPage

export const pageQuery = graphql`
  query ContactPage {
    markdownRemark (frontmatter: { templateKey: { eq: "contact-page" } }) {
      frontmatter {
        heading
        description
        seo {
          title
          description
          image {
            name
          }
        }
      }
    }
  }
`
