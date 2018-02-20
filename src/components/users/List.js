import React, { Component, PropTypes } from 'react';
import { fetch, toggleRole, destroy } from '../../ducks/users';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  IconButton,
  Toggle
} from 'material-ui';
import { DeviceAccessAlarms, ActionPermIdentity, ContentRemoveCircle } from 'material-ui/svg-icons';

const short = { width: '30px' };

export class List extends Component {

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const { currentUserIsAdmin, toggleRole } = this.props;
    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={ short }>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '155px' }}>Created at</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
            { currentUserIsAdmin && <TableHeaderColumn style={ short }>UM</TableHeaderColumn> }
            { currentUserIsAdmin && <TableHeaderColumn style={ short }>Admin</TableHeaderColumn> }

          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          { this.props.users.items.map(u =>
            <TableRow key={u.id}>
              <TableRowColumn style={ short }>{u.id}</TableRowColumn>
              <TableRowColumn>{u.name}</TableRowColumn>
              <TableRowColumn>{u.email}</TableRowColumn>
              <TableRowColumn style={{ width: '155px' }}>{u.formattedCreatedAt}</TableRowColumn>
              <TableRowColumn>
                <IconButton
                  disabled={u.roles.includes('admin') && !currentUserIsAdmin}
                  onTouchTap={ () => this.props.history.push(`/my/users/${u.id}/profile`) }
                  tooltip='Edit profile'
                  tooltipPosition='top-center'
                  tooltipStyles={{ top: '10px' }}>
                  <ActionPermIdentity />
                </IconButton>
                { currentUserIsAdmin && <IconButton
                  onTouchTap={ () => this.props.history.push(`/my/users/${u.id}/jogs`) }
                  tooltip='Edit jogs'
                  tooltipPosition='top-center'
                  tooltipStyles={{ top: '10px' }}>
                  <DeviceAccessAlarms />
                </IconButton> }
                { currentUserIsAdmin && <IconButton
                  onTouchTap={ () => this.props.destroy(u.id) }
                  tooltip='Remove user'
                  tooltipPosition='top-center'
                  tooltipStyles={{ top: '10px' }}>
                  <ContentRemoveCircle />
                </IconButton> }
              </TableRowColumn>
              { currentUserIsAdmin && <TableRowColumn style={ short }>
                <Toggle
                  toggled={u.roles.includes('user_manager')}
                  onToggle={ ()=> toggleRole(u, 'user_manager')}
                />
              </TableRowColumn> }
              { currentUserIsAdmin && <TableRowColumn style={ short }>
                <Toggle
                  toggled={u.roles.includes('admin')}
                  onToggle={ ()=> toggleRole(u, 'admin')}
                />
              </TableRowColumn> }
            </TableRow>
          ) }
        </TableBody>
      </Table>
    );
  }
}

export default withRouter(connect(
  state => ({
    users: state.users,
    currentUserIsAdmin: state.auth.user.roles.includes('admin')
  }),
  { fetch, toggleRole, destroy }
)(List));
