import React from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { RaisedButton } from 'material-ui';

const FormElements = props =>
  <div>
    <Field
      name='name'
      component={ TextField }
      type='text'
      disabled={ props.submitting }
      hintText='Name'
      floatingLabelText='Name'
    />
    <Field
      name='email'
      component={ TextField }
      type='text'
      disabled={ props.submitting }
      hintText='Email'
      floatingLabelText='Email'
    />
    <Field
      name='password'
      component={ TextField }
      type='password'
      disabled={ props.submitting }
      hintText='Password'
      floatingLabelText='Password'
    />
    <RaisedButton type='submit' label={ props.submitLabel } disabled={ props.submitting } primary fullWidth />
  </div>
;

export default FormElements;
