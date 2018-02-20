import React, { Component } from 'react';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import Login from './auth/Login';
import Registration from './auth/Registration';
import Restricted from './Restricted';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { checkStorage } from '../ducks/auth';

export class Main extends Component {
  componentDidMount() {
    this.props.checkStorage();
  }

  render() {
    return (
      <div>
        <Switch>
          <Redirect from='/' exact push to='/my' />
          <Route path='/login' component={ Login } />
          <Route path='/register' component={ Registration } />
          { !this.props.authPending && <PrivateRoute path='/my' component={ Restricted } /> }
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(state => ({ authPending: state.auth.pending }), { checkStorage })(Main));
