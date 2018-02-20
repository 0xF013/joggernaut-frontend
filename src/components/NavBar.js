import React from 'react';
import { withRouter , NavLink} from 'react-router-dom';
import { Drawer, MenuItem, Tabs, Tab, Divider } from 'material-ui';
import { connect } from 'react-redux';

const LinkMenuItem = withRouter(props =>

    <MenuItem containerElement={<NavLink to={ props.to } activeStyle={{ color: 'red' }} />}>{props.children}</MenuItem>
);

const NavBar = ({ roles }) =>
  <Drawer open containerStyle={{ marginTop: '8px' }}>
    <Tabs>
      <Tab label='Joggernaut' buttonStyle={{ height: '64px' }}>
        <LinkMenuItem to='/my/dashboard'>Dashboard</LinkMenuItem>
        <LinkMenuItem to='/my/jogs'>Jogs</LinkMenuItem>
        <Divider />
        { (roles.includes('user_manager') || roles.includes('admin')) && <LinkMenuItem to='/my/users'>Users</LinkMenuItem> }
      </Tab>
    </Tabs>
  </Drawer>
;
export default withRouter(connect(state => ({ roles: state.auth.user.roles }))(NavBar));
