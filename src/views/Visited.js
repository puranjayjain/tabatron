import React, {PropTypes, Component} from 'react'

import moment from 'moment'

import Subheader from 'material-ui/Subheader'
import FlatButton from 'material-ui/FlatButton'
import {GridList, GridTile} from 'material-ui/GridList'
import {Card, CardActions, CardTitle} from 'material-ui/Card'

export default class Visited extends Component {
  // state of the component
  state = {
    // stores sessions data
    sessions: []
  }

  // put sessions data in response
  getSessions = () => chrome.runtime.sendMessage('sessions', (response) => this.setState({sessions: response}))

  // get timezone
  getTimezone = (timestamp) => moment.tz(parseInt(timestamp), moment.tz.guess())

  render() {
    this.getSessions()

    return (
      <div>
        <GridList
          cols={6}
          cellHeight={144}
          //style={styles.gridList}
        >
          {this.state.sessions.map((timestamp, index) => (
            <Card>
              <CardTitle
                title={this.getTimezone(timestamp).format('D MMM YYYY')}
                subtitle={this.getTimezone(timestamp).format('h:m A')}
              />
              <CardActions>
                <FlatButton label="Explore" />
                <FlatButton label="Restore" />
              </CardActions>
            </Card>
          ))}
        </GridList>
      </div>
    )
  }
}

Visited.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}
