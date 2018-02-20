import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { create } from '../../ducks/jogs';
import Form from './Form';

const today = new Date();
today.setHours(0, 0, 0, 0);

const New = props =>
  <Form
    onClose={ () => props.history.push(props.backUrl) }
    title='Record a jog'
    initialValues={{ date: today }}
    onSubmit={ values => props.create(props.user.id, values).then(() => props.history.push(props.backUrl)) }
   />
;


export default withRouter(connect(null, { create })(New));
