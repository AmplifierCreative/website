import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'

const columnStyleRight = {
  paddingTop: "2rem",
  paddingLeft: "2rem",
}

const columnStyleLeft = {
  paddingTop: "2rem",
  paddingRight: "2rem",
}

const contactContainer = {
  marginTop: "7em",
}

const contactInfoText = {
  fontSize: '2.5em',
  fontFamily: "VisbyCF-Bold",
  lineHeight: "1.5em",
}

const formContainer = {
  border: "2px solid #2D2C2C",
}

const visuallyHidden = {
  border: "0",
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0",
  position: "absolute",
  width: "1px",
};

const formRow = {
  display: "flex",
  borderBottom: "2px solid #2D2C2C",
  height: "7em",
}

const formRowTextArea = {
  display: "flex",
  borderBottom: "2px solid #2D2C2C",
  height: "14em",
}

const formRowBottom = {
  display: "flex",
  height: "7em",
}

const fieldContainer50 = {
  width: "50%",
  margin: "0",
}

const fieldContaine100 = {
  width: "100%",
  margin: "0",
}

const inputContainerRight = {
  width: "100%",
  height: "100%",
  margin: "0",
  borderRight: "2px solid #2D2C2C",
}

const inputContainer = {
  width: "100%",
  height: "100%",
  margin: "0",
}

const input = {
  boxShadow: "none",
  border: "none",
  backgroundColor: "#F8F3F1",
  height: "100%"
}

const select = {
  width: "100%",
  height: "110px",
  boxShadow: "none",
  border: "none",
  backgroundColor: "#F8F3F1",
  color: "#FAB395",
  textAlign: "center",
  fontFamily: "VisbyCF-Regular !important",
  fontWeight: "500",
  lineSpacing: ".2em",
  borderRadius: "0",
  lineHeight: "22.5px",
  textTransform: "uppercase",
}

const contactFormTextArea = {
  paddingTop: "16%",
  boxShadow: "none",
  border: "none",
  backgroundColor: "#F8F3F1",
  height: "100%"
}

const buttonContainer = {
  marginTop: "4em",
}

const buttonStyle = {
  width: "244px",
  height: "51px",
}

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  render() {
    return (
      <Layout>
        <section className="section" style={contactContainer}>
          <div className="container is-max-widescreen">
            <div className="columns">
              <div className="column is-half" style={columnStyleLeft}>
                <p style={contactInfoText}>
                Let it all out: your hopes, dreams, fears, dogs… Or we can just talk about your creative needs. That’s fine, too.
                </p>
              </div>
              <div className="column is-half" style={columnStyleRight}>
              <div className="content">
              <form
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                <div style={formContainer}>
                  {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                  <input type="hidden" name="form-name" value="contact" />
                  <div hidden>
                    <label>
                      Don’t fill this out:{' '}
                      <input name="bot-field" onChange={this.handleChange} />
                    </label>
                  </div>
                  <div style={formRow}>
                    <div className="field" style={fieldContainer50}>
                      <label className="label" htmlFor={'name'} style={visuallyHidden}>
                        Your name
                      </label>
                      <div className="control" style={inputContainerRight}>
                        <input
                          style={input}
                          className="input contact-form-input"
                          type={'text'}
                          name={'name'}
                          onChange={this.handleChange}
                          id={'name'}
                          required={true}
                          placeholder={'name'}
                        />
                      </div>
                    </div>
                    <div className="field" style={fieldContainer50}>
                      <label className="label" htmlFor={'business'} style={visuallyHidden}>
                        Business
                      </label>
                      <div className="control" style={inputContainer}>
                        <input
                          style={input}
                          className="input contact-form-input"
                          type={'text'}
                          name={'business'}
                          onChange={this.handleChange}
                          id={'business'}
                          required={true}
                          placeholder={'business'}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={formRow}>
                    <div className="field" style={fieldContaine100}>
                      <label className="label" htmlFor={'email'} style={visuallyHidden}>
                        Email
                      </label>
                      <div className="control" style={inputContainer}>
                        <input
                          style={input}
                          className="input contact-form-input"
                          type={'email'}
                          name={'email'}
                          onChange={this.handleChange}
                          id={'email'}
                          required={true}
                          placeholder={'email'}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={formRow}>
                    <div className="field" style={fieldContainer50}>
                      <label className="label" htmlFor={'phone'} style={visuallyHidden}>
                        Phone
                      </label>
                      <div className="control" style={inputContainerRight}>
                        <input
                          style={input}
                          className="input contact-form-input"
                          type={'tel'}
                          name={'phone'}
                          onChange={this.handleChange}
                          id={'phone'}
                          required={true}
                          placeholder={'phone'}
                        />
                      </div>
                    </div>
                    <div className="field" style={fieldContainer50}>
                      <label className="label" htmlFor={'location'} style={visuallyHidden}>
                        City and State
                      </label>
                      <div className="control" style={inputContainer}>
                        <input
                          style={input}
                          className="input contact-form-input"
                          type={'text'}
                          name={'location'}
                          onChange={this.handleChange}
                          id={'location'}
                          required={true}
                          placeholder={'City x State'}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={formRow}>
                    <div className="field" style={fieldContaine100}>
                      <label className="label" htmlFor={'method'}  style={visuallyHidden}>
                        Preferred contact method
                      </label>
                      <div className="control" style={inputContainer}>
                        <div className="">
                          <select name={'method'} id={'method'} style={select}>
                            <option>Email</option>
                            <option>Phone</option>
                            <option>Text</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={formRowTextArea}>
                    <div className="field" style={fieldContaine100}>
                      <label className="label" htmlFor={'message'} style={visuallyHidden}>
                        Message
                      </label>
                      <div className="control" style={inputContainer}>
                        <textarea
                          style={contactFormTextArea}
                          className="textarea contact-form-input"
                          name={'message'}
                          onChange={this.handleChange}
                          id={'message'}
                          required={true}
                          placeholder={'Service(s) you’re interested in'}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={formRowBottom}>
                    <div className="field" style={fieldContaine100}>
                      <label className="label" htmlFor={'dog'} style={visuallyHidden}>
                        Your dog’s name
                      </label>
                      <div className="control" style={inputContainer}>
                        <input
                          style={input}
                          className="input contact-form-input"
                          type={'text'}
                          name={'dog'}
                          onChange={this.handleChange}

                          id={'dog'}
                          required={true}
                          placeholder={'Your dog’s name'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field" style={buttonContainer}>
                  <button className="button" type="submit" style={buttonStyle}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
              </div>
            </div>
 
          </div>
        </section>
      </Layout>
    )
  }
}
