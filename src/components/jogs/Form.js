import React from 'react';
import { Dialog, RaisedButton } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import { create } from '../../ducks/jogs';
import { DatePicker, TextField } from 'redux-form-material-ui';

const now = new Date();
const Form = ({ title, onClose, onSubmit, ...props }) =>
  <Dialog onRequestClose={ onClose } open title={ title } contentStyle={{ maxWidth: '310px' }}>
    <form onSubmit={ props.handleSubmit(onSubmit) }>
      <Field
        name='date'
        component={ DatePicker }
        disabled={ props.submitting }
        hintText='Date'
        format={ (value, name) => value === '' ? null : value }
        floatingLabelText='Date'
        shouldDisableDate={ date => date > now }
      />
      <Field
        name='distance'
        component={ TextField }
        disabled={ props.submitting }
        hintText='Distance (km)'
        floatingLabelText='Distance (km)'
        type='number'
      />
      <Field
        name='duration'
        component={ TextField }
        disabled={ props.submitting }
        hintText='Duration (hh:mm)'
        floatingLabelText='Duration (hh:mm)'
        type='text'
      />
      <RaisedButton type='submit' label='Save' disabled={ props.submitting } primary fullWidth />
    </form>
  </Dialog>;


const DecoratedForm = reduxForm({
  form: 'jog'
 })(Form);

export default DecoratedForm;
