import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Dialog, RaisedButton } from 'material-ui';
import { TextField } from 'redux-form-material-ui';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { register } from '../../ducks/registration';
import { authorizeSuccess } from '../../ducks/auth';
import AutofillForm from './AutofillForm';
import AlternativePrompt from './AlternativePrompt';

const Registration = props =>
  <Dialog modal open title='Registration' contentStyle={{ maxWidth: '310px' }}>
    <AutofillForm onSubmit={ props.handleSubmit(values => props.register(values).then(props.authorizeSuccess)) }>
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
      <RaisedButton type='submit' label='Sign up' disabled={ props.submitting } primary fullWidth />
      <AlternativePrompt>Already have an account? <Link to='/login'>Sign in</Link></AlternativePrompt>
      { props.auth.isAuthenticated && <Redirect to={{ pathname: '/my/dashboard' }} /> }
    </AutofillForm>
  </Dialog>;

const mapStateToProps = state => ({ auth: state.auth });
export default reduxForm({ form: 'registration' })(connect(mapStateToProps, { register, authorizeSuccess })(Registration));
