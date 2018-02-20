import React, { Component } from 'react';
import { getAverages } from '../ducks/jogs';
import { connect } from 'react-redux';
import { Chart } from 'react-google-charts';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui';

export class Dashboard extends Component {
  componentDidMount() {
    this.props.getAverages(this.props.user.id);
  }

  render() {
    const { averages } = this.props;
    if (!averages.length) {
      return <div>No data</div>;
    }
    const speedRows = averages.map(avg => [ avg.week, avg.speed ]);
    const speedColumns = [{
        type: 'string',
        label: 'Week',
      },
      {
        type: 'number',
        label: 'Speed (km/h)',
      }
    ];
    const distanceRows = averages.map(avg => [ avg.week, avg.distance ]);
    const distanceColumns = [{
        type: 'string',
        label: 'Week',
      },
      {
        type: 'number',
        label: 'Distance (km)',
      }
    ];
    return (
      <div>
        <Chart
          chartType='AreaChart'
          rows={ speedRows }
          columns={ speedColumns }
          options={{
            title: 'Average speed per week',
            hAxis: { title: 'Week' },
            vAxis: { title: 'Average speed' },
          }}
          graph_id='AverageWeeklySpeed'
          width='90%'
          height='300px'
          legend={false}
        />
        <Chart
          chartType='AreaChart'
          rows={ distanceRows }
          columns={ distanceColumns }
          options={{
            title: 'Average distance per week',
            hAxis: { title: 'Week' },
            vAxis: { title: 'Average distance' },
          }}
          graph_id='AverageWeeklyDistance'
          width='90%'
          height='300px'
          legend={false}
        />
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Week</TableHeaderColumn>
              <TableHeaderColumn>Avg. speed</TableHeaderColumn>
              <TableHeaderColumn>Avg. distance</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={ false }>
            { averages.map(avg =>
              <TableRow key={avg.week}>
                <TableRowColumn>{avg.weekStart} - { avg.weekEnd }</TableRowColumn>
                <TableRowColumn>{avg.speed} km/h</TableRowColumn>
                <TableRowColumn>{avg.distance} km</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default connect(
  state => ({
    averages: state.jogs.averages,
    user: state.auth.user,
  }),
  { getAverages }
)(Dashboard);
