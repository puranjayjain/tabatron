import React, {PropTypes, Component} from 'react'

import FlatButton from 'material-ui/FlatButton'
// import WebAsset from 'material-ui/svg-icons/av/web-asset'
import InsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file'

export default class Timeitem extends Component {
  static propTypes = {
    /**
    * dashed line visibility
    */
    showDashed: PropTypes.bool,
    /**
    * dashed line style overrides and styles
    */
    dashedStyle: PropTypes.object,
    /**
    * TODO line direction, the main line direction true: horizontal or false: vertical (default)
    */
    lineDirection: PropTypes.bool,
    /**
    * text of the timeline item
    */
    text: PropTypes.string,
    /**
    * icon of the timeline item
    */
    icon: React.PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]),
    /**
    * on click action of the Timeitem
    */
    onTouchTap: PropTypes.func
  }

  /**
  * default props
  */
  static defaultProps = {
    dashedHeight: 20,
    icon: <InsertDriveFile />
  }

  componentWillMount(){
    /**
     * if typeof is string then put it in image and then into the state
     */
    let icon
     if (typeof this.props.icon === 'string' && this.props.icon !== '') {
       icon =
       <img
         src={this.props.icon}
         width={20}
       />
     }
     else {
       icon = <InsertDriveFile />
     }
     this.setState({icon: icon})
  }

  render() {
    // console.log(this.props.icon)
    // console.log(React.PropTypes);
    const style = {
      container: {
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        width: 'fit-content',
        paddingLeft: 16,
        marginBottom: -6,
        overflow: 'visible'
      },
      dot: {
        width: 9,
        height: 9,
        borderRadius: '50%',
        background: this.context.muiTheme.palette.greenText,
        marginLeft: 9,
        zIndex: 2
      },
      timeline: {
        background: this.context.muiTheme.palette.greenText,
        height: 20,
        width: 2,
        marginLeft: 12,
        zIndex: 2
      },
      tab: {
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
        borderLeft: `2px ${this.context.muiTheme.palette.greenText} dotted`,
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
          <div style={Object.assign(style.sLine, this.props.dashedStyle)}></div>
          <div style={style.dot}></div>
        </div>
        <FlatButton
          label={this.props.text}
          backgroundColor={this.context.muiTheme.palette.primary1Color}
          secondary={true}
          style={style.tab}
          hoverColor={this.context.muiTheme.palette.hoverColor}
          icon={this.state.icon}
          onTouchTap={this.props.onTouchTap}
        />
      </div>
    )
  }
}

Timeitem.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}
