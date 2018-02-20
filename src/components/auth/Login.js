import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { authorize } from '../../ducks/auth';
import { Redirect } from 'react-router-dom';
import { Dialog, RaisedButton } from 'material-ui';
import { TextField } from 'redux-form-material-ui';
import AutofillForm from './AutofillForm';
import AlternativePrompt from './AlternativePrompt';

const Login = props =>
  <Dialog modal open title='Login' contentStyle={{ maxWidth: '310px' }}>
    <AutofillForm onSubmit={ props.handleSubmit(props.authorize) }>
      <Field
        name='email'
        component={ TextField }
        type='text'
        disabled={ props.submitting }
        hintText='Email'
        floatingLabelText='Email'
        errorText={ props.auth.error ? 'Invalid credentials' : '' }
      />
      <Field
        name='password'
        component={ TextField }
        type='password'
        disabled={ props.submitting }
        hintText='Password'
        floatingLabelText='Password'
      />
      <RaisedButton type='submit' label='Sign in' disabled={ props.submitting } primary fullWidth />
      <AlternativePrompt>Don't have an account? <Link to='/register'>Sign up</Link></AlternativePrompt>
      { props.auth.isAuthenticated && <Redirect to={{ pathname: '/my/dashboard' }} /> }
    </AutofillForm>
  </Dialog>;

const mapStateToProps = state => ({ auth: state.auth });
export default reduxForm({ form: 'login' })(connect(mapStateToProps, { authorize })(Login));
