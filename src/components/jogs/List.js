import React, { Component, PropTypes } from 'react';
import { fetch, toggleRole, destroy, clearFilters } from '../../ducks/jogs';
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
import { EditorModeEdit, ContentRemoveCircle } from 'material-ui/svg-icons';
import FilterBar from './FilterBar';
const short = { width: '30px' };

export class List extends Component {

  componentDidMount() {
    this.props.clearFilters();
    this.props.fetch(this.props.user.id);
  }

  render() {
    const { items, from, to } = this.props.jogs;
    let filteredItems = items;
    if (from) {
      filteredItems = filteredItems.filter(item => (new Date(item.date)) >= from);
    }

    if (to) {
      filteredItems = filteredItems.filter(item => (new Date(item.date)) <= to);
    }
    return (
      <div>
        <FilterBar />
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Date</TableHeaderColumn>
              <TableHeaderColumn>Duration</TableHeaderColumn>
              <TableHeaderColumn>Distance</TableHeaderColumn>
              <TableHeaderColumn>Avg. speed</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={ false }>
            { filteredItems.map(jog =>
              <TableRow key={jog.id}>
                <TableRowColumn>{jog.formattedDate}</TableRowColumn>
                <TableRowColumn>{jog.formattedDuration}</TableRowColumn>
                <TableRowColumn>{jog.formattedDistance}</TableRowColumn>
                <TableRowColumn>{jog.speed}</TableRowColumn>
                <TableRowColumn>
                  <IconButton
                    onTouchTap={ () => this.props.history.push(`/my/jogs/${jog.id}/edit`) }
                    tooltip='Edit jog'
                    tooltipPosition='top-center'
                    tooltipStyles={{ top: '10px' }}>
                    <EditorModeEdit />
                  </IconButton>
                  <IconButton
                    onTouchTap={ () => this.props.destroy(this.props.user.id, jog) }
                    tooltip='Remove jog'
                    tooltipPosition='top-center'
                    tooltipStyles={{ top: '10px' }}>
                    <ContentRemoveCircle />
                  </IconButton>
                </TableRowColumn>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default connect(
  (state, props) => ({
    jogs: state.jogs
  }),
  { fetch, toggleRole, destroy, clearFilters }
)(withRouter(List));
