import React from 'react';
import List from './List';
import { Route, withRouter } from 'react-router-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import New from './New';
import Edit from './Edit';

const Jogs = ({ history, match, user, location }) =>
  <div>
    <Route path={`${match.url}/`} render={ props => (<List user={ user } {...props} />) } />
    <Route path={`${match.url}/new`} render={ props => <New backUrl={match.url} user={ user } {...props} /> } />
    <Route path={`${match.url}/:jogId/edit`} render={ props => <Edit backUrl={match.url} user={ user } {...props} /> } />
    <FloatingActionButton
      onTouchTap={ () => history.push(`${match.url}/new`) }
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '36px'
      }}>
      <ContentAdd />
    </FloatingActionButton>
  </div>
;

export default withRouter(Jogs);
