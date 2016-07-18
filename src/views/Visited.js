import React, {PropTypes, Component} from 'react'

import Timeitem from '../components/Timeitem'

export default class Visited extends Component {
  render() {
    const style = {
      container: {
        display: 'flex',
        flexDirection: 'column'
      },
      timeline: {
        background: this.context.muiTheme.palette.accent1Color,
        height: 2,
        width: '100%',
        marginTop: 34
      }
    }

    return (
      <div style={style.container}>
        <div style={style.timeline}></div>
        <Timeitem />
        <Timeitem />
      </div>
    )
  }
}

Visited.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}
