import React from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { AppBar, IconMenu, MenuItem, IconButton } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Users from './users/Users';
import Jogs from './jogs/Jogs';
import { connect } from 'react-redux';
import { logout } from '../ducks/auth';
import RolesBasedRoute from './RoleBasedRoute';
import MyProfile from './users/MyProfile';

const Wrapper = styled.div`
  padding-left: 250px;
`;

const WelcomeMessage = styled.span`
  color: white;
  position: relative;
  top: -7px;
`;

const Restricted = ({ user, logout, history }) => (
  <div>
    <AppBar
      title='Joggernaut'
      iconElementRight={
        <div>
          <WelcomeMessage>Welcome, {user.name}</WelcomeMessage>
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
            <MenuItem primaryText='My profile' onTouchTap={ () => history.push(`/my/profile/`) } />
            <MenuItem primaryText='Sign out' onTouchTap={ logout } />
          </IconMenu>
        </div>
      }
    />
    <NavBar />
    <Wrapper>
      <Switch>
        <Redirect exact push from='/my' to='/my/dashboard' />
        <Route path={'/my/dashboard'} component={Dashboard} />
        <Route path={'/my/profile'} component={MyProfile} />
        <Route path={'/my/jogs'} render={ props => <Jogs user={ user } {...props} /> } />
        <RolesBasedRoute roles={['user_manager', 'admin']} path={'/my/users'} component={Users} />
      </Switch>
    </Wrapper>
  </div>
);

export default withRouter(connect(state => ({ user: state.auth.user }), { logout })(Restricted));
