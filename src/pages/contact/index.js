import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'

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
        <section className="section">
          <div className="container is-max-widescreen">
            <div className="content">
              <form
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </div>
                  <div className="field">
                    <label className="label" htmlFor={'name'} style={visuallyHidden}>
                      Your name
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'text'}
                        name={'name'}
                        onChange={this.handleChange}
                        id={'name'}
                        required={true}
                        placeholder={'name'}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={'business'} style={visuallyHidden}>
                      Business
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={'text'}
                        name={'business'}
                        onChange={this.handleChange}
                        id={'business'}
                        required={true}
                        placeholder={'business'}
                      />
                    </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'email'} style={visuallyHidden}>
                    Email
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'email'}
                      name={'email'}
                      onChange={this.handleChange}
                      id={'email'}
                      required={true}
                      placeholder={'email'}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'phone'} style={visuallyHidden}>
                    Phone
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'tel'}
                      name={'phone'}
                      onChange={this.handleChange}
                      id={'phone'}
                      required={true}
                      placeholder={'phone'}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'location'} style={visuallyHidden}>
                    City and State
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'text'}
                      name={'location'}
                      onChange={this.handleChange}
                      id={'location'}
                      required={true}
                      placeholder={'City x State'}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'method'}  style={visuallyHidden}>
                    Preferred contact method
                  </label>
                  <div className="control">
                    <div className="select">
                      <select name={'method'} id={'method'}>
                        <option>Email</option>
                        <option>Phone</option>
                        <option>Text</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'message'} style={visuallyHidden}>
                    Message
                  </label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name={'message'}
                      onChange={this.handleChange}
                      id={'message'}
                      required={true}
                      placeholder={'Service(s) you’re interested in'}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'dog'} style={visuallyHidden}>
                    Your dog’s name
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type={'text'}
                      name={'dog'}
                      onChange={this.handleChange}
                      id={'dog'}
                      required={true}
                      placeholder={'Your dog’s name'}
                    />
                  </div>
                </div>
                <div className="field">
                  <button className="button" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
