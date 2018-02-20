import React from 'react';
import List from './List';
import Profile from './Profile';
import NewProfile from './NewProfile';
import { Route, withRouter } from 'react-router-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import UserJogs from './UserJogs';

const Users = ({ history }) =>
  <div>
    <List />
    <FloatingActionButton
      onTouchTap={ () => history.push('/my/users/new') }
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '36px'
      }}>
      <ContentAdd />
    </FloatingActionButton>
    <Route path='/my/users/:userId/profile' component={ Profile } />
    <Route path='/my/users/new' component={ NewProfile } />
    <Route path='/my/users/:userId/jogs' render={ props => <UserJogs {...props} /> } />
  </div>
;

export default withRouter(Users);
