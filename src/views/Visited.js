import React, {PropTypes, Component} from 'react'

// import moment from 'moment'
import moment from 'moment-timezone'

import Subheader from 'material-ui/Subheader'
import FlatButton from 'material-ui/FlatButton'
import {GridList, GridTile} from 'material-ui/GridList'
import {Card, CardActions, CardTitle} from 'material-ui/Card'

const style = {
  gridList: {
    margin: 0,
    padding: '0 2px'
  }
}

export default class Visited extends Component {
  // state of the component
  state = {
    // stores sessions data
    sessions: []
  }

  /**
  * load data or process it on page load
  * @method componentWillMount
  */
  componentWillMount() {
    this.getSessions()
  }

  onExplore = (timestamp) => {
    window.location.hash = `timeline/${timestamp}/visited`
  }

  // put sessions data in response
  getSessions = () => {
    chrome.runtime.sendMessage('sessions', (response) => {
      // parse all the same months together
      // using a while -- loop for performance boost
      let i = response.length,
      sessions = [],
      session = {
        head: '',
        info: []
      }
      while (i--) {
        const m = moment.tz(parseInt(response[i]), moment.tz.guess())
        if (m.format('MMMM - YYYY') === session.head) {
          sessions[0].info.unshift({
            title: m.format('D MMMM'),
            subtitle: `Last activity: ${m.format('hh:mm A')}`,
            timestamp: response[i]
          })
        }
        else {
          session.head = m.format('MMMM - YYYY')
          session.info = [{
            title: m.format('D MMMM'),
            subtitle: `Last activity: ${m.format('hh:mm A')}`,
            timestamp: response[i]
          }]
          sessions.unshift(session)
        }
      }
      // put that all in the session
      this.setState({sessions: sessions})
    })
  }

  render() {
    return (
      <div>
        {this.state.sessions.map((session, index) => (
          <div key={index}>
            <Subheader>{session.head}</Subheader>
            <GridList
              cols={6}
              cellHeight={144}
              style={style.gridList}
            >
              {session.info.map((detail, index) => (
                <Card key={index}>
                  <CardTitle
                    title={detail.title}
                    subtitle={detail.subtitle}
                  />
                  <CardActions>
                    <FlatButton
                      onTouchTap={this.onExplore.bind(this, detail.timestamp)}
                      label="Explore"
                      backgroundColor={this.context.muiTheme.palette.accent1Color}
                    />
                    <FlatButton label="Restore" />
                  </CardActions>
                </Card>
              ))}
            </GridList>
          </div>
        ))}
      </div>
    )
  }
}

Visited.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}
