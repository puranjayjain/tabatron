import React, {PropTypes, Component} from 'react'

import moment from 'moment-timezone'
import hashids from 'hashids'
import url from 'url'
import mrEmitter from '../helpers/mrEmitter'

import Timeitem from '../components/Timeitem'
import Breadcrumbs from '../components/Breadcrumbs'
import IconButton from 'material-ui/IconButton'

import Save from 'material-ui/svg-icons/content/save'
import Delete from 'material-ui/svg-icons/action/delete'
import Restore from 'material-ui/svg-icons/action/restore'

let crumbData
const hashid = new hashids('tabatron')

export default class Timeline extends Component {
  state = {
    from: 'now',
    to: 'Today',
    timelineData: []
  }

  componentWillMount() {
    const m = moment.tz(parseInt(this.props.params.timestamp), moment.tz.guess())
    // using the id request the session and tab data
    chrome.runtime.sendMessage({type: 'session', id: this.props.params.id}, (TabData) => {
      //refer to the inner data of tabData
      this.setState({timelineData: TabData})
    })
    this.setState({
      from: this.props.params.from,
      to: `${m.format('D MMMM YYYY')}, Last activity: ${m.format('hh:mm A')}`
    })
  }

  componentDidMount() {
    // set right menu to common element in the Appbar
    this.setMenu()
  }

  componentWillUnmount() {
    let commonRightElement = <div></div>
    mrEmitter.emit('onUpdateCommonRightElement', commonRightElement)
  }

  setMenu = () => {
    // set icon menu to context
    let commonRightElement =
    <div>
      <IconButton tooltip="Restore this session"><Restore /></IconButton>
      <IconButton tooltip="Add to saved sessions"><Save /></IconButton>
      <IconButton
        tooltip="Delete this session"
        tooltipPosition="bottom-left"
      ><Delete /></IconButton>
    </div>
    mrEmitter.emit('onUpdateCommonRightElement', commonRightElement)
  }

  getUrl = (parseUrl) => {
    let newUrl = url.parse(parseUrl).host.replace('www.', '').split('.')[0]
    if (!newUrl) {
      return parseUrl
    }
    // if other url return the same
    else {
      return newUrl
    }
  }

  render() {
    const style = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 64px)'
      },
      timeline: {
        background: this.context.muiTheme.palette.greenText,
        height: 2,
        width: '100%',
        marginTop: 12
      },
      timelineContainer: {
        marginTop: -5,
        display: 'flex',
        overflowY: 'scroll',
        flex: 1,
        paddingRight: 32
      },
      timelineItemContainer: {
        flexShrink: 0
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
        <div style={style.timelineContainer}>
          {this.state.timelineData.map((tabs, index) => (
            <span
              style={style.timelineItemContainer}
              key={index}
            >
              {tabs[Object.keys(tabs)[0]].map((tab, index2) => (
                <Timeitem
                  key={index2}
                  icon={tab.f}
                  text={this.getUrl(tab.u)}
                />
              ))}
            </span>
          ))}
        </div>
      </div>
    )
  }
}

Timeline.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}
