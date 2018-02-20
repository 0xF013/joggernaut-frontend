import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { update } from '../../ducks/jogs';
import Form from './Form';


const Edit = props =>
  <Form
    onClose={ () => props.history.push(props.backUrl) }
    title='Update a jog'
    initialValues={ props.jog && {
      id: props.jog.id,
      date: new Date(props.jog.date),
      distance: (props.jog.distance / 1000).toFixed(2),
      duration: `${(Math.floor(props.jog.duration / 60))}:${(props.jog.duration % 60).toString().padStart(2, 0)}`
    }}
    onSubmit={ values => props.update(props.user.id, values).then(() => props.history.push(props.backUrl)) }
   />
;


export default connect((state, props) => ({
  jog: state.jogs.items.find(jog => jog.id === Number(props.match.params.jogId))
}), { update })(withRouter(Edit));
