import React, {PropTypes, Component} from 'react'

import Timeitem from '../components/Timeitem'
import Breadcrumbs from '../components/Breadcrumbs'

let crumbData
export default class Timeline extends Component {
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
        text: 'Home',
        url: ''
      },
      {
        text: 'Timeline',
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
