import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Dialog } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { create } from '../../ducks/users';
import FormElements from './FormElements';
import AutofillPrevention from './AutofillPrevention';

const Profile = props =>
  <Dialog onRequestClose={ () => props.history.push('/my/users') } open title='Create user' contentStyle={{ maxWidth: '310px' }}>
    <form onSubmit={ props.handleSubmit(values => props.create(values).then(() => props.history.push('/my/users'))) }>
      <AutofillPrevention />
      <FormElements submitting={props.submitting} submitLabel='Save' />
    </form>
  </Dialog>;

const DecoratedForm = reduxForm({
  form: 'newUserProfile'
 })(Profile);
const ConnectedForm = connect(null, { create })(DecoratedForm);
const WithRouterForm = withRouter(ConnectedForm);
export default WithRouterForm;
