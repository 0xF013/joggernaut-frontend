import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const RoleBasedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    rest.userRoles.find(r => rest.roles.includes(r)) ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const mapStateToProps = state => ({
  userRoles: state.auth.user.roles,
});

export default withRouter(
  connect(mapStateToProps)(RoleBasedRoute)
);
