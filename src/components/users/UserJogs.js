import React from 'react';
import Jogs from '../jogs/Jogs';
import { connect } from 'react-redux';
import { Dialog } from 'material-ui';

const UserJogs = props => {
  if (!props.user) {
    return null;
  }
  return (
    <Dialog onRequestClose={ () => props.history.push(`/my/users`) } open title='User jogs' contentStyle={{ minHeight: '300px' }}>
      <div><Jogs {...props} /></div>
    </Dialog>
  );
}

export default connect((state, props) => ({
  user: state.users.items.find(u => u.id === Number(props.match.params.userId))
}))(UserJogs);
