import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Dialog } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { updateMyProfile } from '../../ducks/auth';
import FormElements from './FormElements';
import AutofillPrevention from './AutofillPrevention';

const MyProfile = props =>
  <Dialog onRequestClose={ () => props.history.push('/my') } open title='Update my profile' contentStyle={{ maxWidth: '310px' }}>
    <form onSubmit={ props.handleSubmit(values => props.updateMyProfile(values).then(() => props.history.push('/my'))) }>
      <AutofillPrevention />
      <FormElements submitting={props.submitting} submitLabel='Save' />
    </form>
  </Dialog>;

const mapStateToProps = (state, props) => ({
  initialValues: state.auth.user
});

const DecoratedForm = reduxForm({
  form: 'userProfile'
 })(MyProfile);
const ConnectedForm = connect(mapStateToProps, { updateMyProfile })(DecoratedForm);
const WithRouterForm = withRouter(ConnectedForm);
export default WithRouterForm;
