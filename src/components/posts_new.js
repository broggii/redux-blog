import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const {
      meta: { touched, error },
    } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <br />
        <small style={{ color: 'red' }}>{touched ? error : ''}</small>
        {field.input.name !== 'content' ? (
          <input className="form-control" type="text" {...field.input} />
        ) : (
          <textarea
            id="content"
            className="form-control"
            cols="30"
            rows="10"
            {...field.input}
          />
        )}
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field label="Title" name="title" component={this.renderField} />
          <Field
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field
            label="Post Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link
            to="/"
            style={{ marginLeft: '10px' }}
            className="btn btn-danger"
          >
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Enter a title!';
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories!';
  }
  if (!values.content) {
    errors.content = 'Enter some content!';
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'PortsNewForm',
})(
  connect(
    null,
    { createPost },
  )(PostsNew),
);
