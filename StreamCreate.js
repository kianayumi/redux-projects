import React from 'react';
//Field is React component (therefore, is capitalized); shows an input field to
//user (checkbox, radio button, text-input, drop-down)
//reduxForm is a Redux function (same as connector fxn, but is automatic)
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  //1st version
  // renderInput(formProps) {
  // return <input onChange={formProps.input.onChange} value={formProps.input.value} />
  // }
  //2nd version
  // renderInput(formProps) {
  //the formProps input prop (an object w/ value prop and onChange handler
  // return <input onChange={...formProps.input} />
  // }
  //3rd version
  //formProps being passed in as prop, destructuring input
  //key-value pairs) are props on input element
  //destructured label prop coming from label text in render fxn
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    //error & touch destructured from meta
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    //createStream action creator
    this.props.createStream(formValues);
  };

  render() {
    return (
      //onSubmit prop being passed to form
      //this.props.handleSubmit from Redux form (called with our callback method)
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        {/* name prop : handles user input for name of stream */}
        {/* component prop : React component or fxn to call; needs to return
        element to show on screen */}
        {/* label's text is sent as props in renderInput */}
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

//run at initial render or when user interacts with form
const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'Please enter a title.';
  }
  if (!formValues.description) {
    errors.title = 'Please enter a description';
  }
  return errors;
};

//reduxForm returns function, then that function is called with StreamCreate
const formWrapped = reduxForm({
  form: 'StreamCreate',
  //will run validate fxn
  validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
