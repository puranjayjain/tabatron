import React, {PropTypes, Component} from 'react'

import moment from 'moment-timezone'

import Timeitem from '../components/Timeitem'
import Breadcrumbs from '../components/Breadcrumbs'

let crumbData

export default class Timeline extends Component {
  state = {
    from: 'now',
    to: 'Today'
  }

  componentWillMount() {
    const m = moment.tz(parseInt(this.props.params.timestamp), moment.tz.guess())
    this.setState({
      from: this.props.params.from,
      to: `${m.format('D MMMM YYYY')}, Last activity: ${m.format('hh:mm A')}`
    })
  }

  render() {
    const style = {
      container: {
        display: 'flex',
        flexDirection: 'column'
      },
      timeline: {
        background: this.context.muiTheme.palette.greenText,
        height: 2,
        width: '100%',
        marginTop: 12
      }
    }

    crumbData = [
      {
        text: this.state.from,
        url: `#${this.state.from}`
      },
      {
        text: this.state.to,
        url: ''
      }
    ]

    return (
      <div style={style.container}>
        <Breadcrumbs
          children={crumbData}
        />
        <div style={style.timeline}></div>
        <Timeitem text="facebook" />
        <Timeitem text="google" />
      </div>
    )
  }
}

Timeline.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}
