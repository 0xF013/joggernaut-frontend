import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Dialog } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { update } from '../../ducks/users';
import FormElements from './FormElements';
import AutofillPrevention from './AutofillPrevention';

const Profile = props =>
  <Dialog onRequestClose={ () => props.history.push('/my/users') } open title='Edit user' contentStyle={{ maxWidth: '310px' }}>
    <form onSubmit={ props.handleSubmit(values => props.update(values).then(() => props.history.push('/my/users'))) }>
      <AutofillPrevention />
      <FormElements submitting={props.submitting} submitLabel='Save' />
    </form>
  </Dialog>;

const mapStateToProps = (state, props) => ({
  initialValues: state.users.items.find(u => u.id === parseInt(props.match.params.userId))
});

const DecoratedForm = reduxForm({
  form: 'userProfile'
 })(Profile);
const ConnectedForm = connect(mapStateToProps, { update })(DecoratedForm);
const WithRouterForm = withRouter(ConnectedForm);
export default WithRouterForm;
