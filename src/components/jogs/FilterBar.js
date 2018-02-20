import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle, DatePicker, IconButton } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import { setFilterDate, clearFilters } from '../../ducks/jogs';
import { ActionDelete } from 'material-ui/svg-icons';

const FilterBar = props =>
  <Toolbar>
    <ToolbarGroup>
      <ToolbarTitle text='Filter dates:' />
      <DatePicker
        style={{ marginRight: '10px' }}
        hintText='From'
        value={ props.from }
        onChange={ (e, value) => props.setFilterDate('from', value) }
      />
      <DatePicker
        hintText='To'
        value={ props.to }
        onChange={ (e, value) => props.setFilterDate('to', value) }
      />
    </ToolbarGroup>
    <ToolbarGroup>
      <IconButton
        onTouchTap={ props.clearFilters }
        tooltip='Clear filter'>
        <ActionDelete />
      </IconButton>
    </ToolbarGroup>
  </Toolbar>
;

export default connect(state => ({
  from: state.jogs.from,
  to: state.jogs.to,
}), { setFilterDate, clearFilters })(FilterBar);
