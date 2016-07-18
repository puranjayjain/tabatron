import React, {PropTypes, Component} from 'react'

export default class Timeitem extends Component {
  static propTypes = {
    /**
    * dashed line visibility
    */
    showDashed: PropTypes.bool,
    /**
    * dashed line height
    */
    dashedHeight: PropTypes.number
  }

  render() {
    const style = {
      container: {
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        width: 'fit-content',
        paddingLeft: 9,
        marginTop: -6
      },
      dot: {
        width: 9,
        height: 9,
        borderRadius: '50%',
        background: this.context.muiTheme.palette.accent1Color,
        marginLeft: 9,
        zIndex: 2
      },
      timeline: {
        background: this.context.muiTheme.palette.accent1Color,
        height: 20,
        width: 2,
        marginLeft: 12,
        zIndex: 2
      },
      tab: {
        padding: '8px 16px',
        borderRadius: 3,
        background: this.context.muiTheme.palette.primary1Color,
        marginTop: -6
      },
      sTimeline: {
        position: 'absolute',
        right: 9,
        top: 0,
        display: this.props.showDashed ? 'block' : 'none'
      },
      sLine: {
        height: 20,
        borderLeft: `2px ${this.context.muiTheme.palette.accent1Color} dotted`,
        marginLeft: 12,
        zIndex: 2
      }
    }

    return (
      <div style={style.container}>
        <div style={style.dot}></div>
        <div style={style.timeline}></div>
        <div style={style.dot}></div>
        <div style={style.sTimeline}>
          <div style={style.dot}></div>
          <div style={style.sLine}></div>
          <div style={style.dot}></div>
        </div>
        <div style={style.tab}>
          tabs are here
        </div>
      </div>
    )
  }
}

Timeitem.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}
