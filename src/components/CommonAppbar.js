import React, {PropTypes, Component} from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import Appbar from 'material-ui/Appbar'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'

// icons
import Today from 'material-ui/svg-icons/action/today'
import History from 'material-ui/svg-icons/action/History'
import Save from 'material-ui/svg-icons/content/save'
import Settings from 'material-ui/svg-icons/action/settings'
import Help from 'material-ui/svg-icons/action/help'

export default class CommonAppbar extends Component {
  state = {
    open: false
  }

  handleToggle = () => this.setState({
    open: !this.state.open
  })

  handleClose = () => this.setState({
    open: false
  })

  changePage = (e, menuItem) => {
    window.location.hash = menuItem.props.value
    this.handleClose()
    // emit onRouteChange event
  }

  // capitalize the first letter of string
  capitalize = (s) => {
    return s && s[0].toUpperCase() + s.slice(1)
  }

  // check if that menu item should have the active class
  isActive = (to) => {
    if (this.context.location.pathname === to) {
      return {
        background: this.context.muiTheme.palette.primary1Color,
        color: this.context.muiTheme.palette.alternateTextColor
      }
    }
    else {
      return {
        background: 'transparent'
      }
    }
  }

  // check if that icon should have the active class
  isActiveIcon = (to) => {
    if (this.context.location.pathname === to) {
      return {
        fill: this.context.muiTheme.palette.textColor,
        color: this.context.muiTheme.palette.textColor
      }
    }
    else {
      return ''
    }
  }

  // get page title according to the page
  getPageTitle = () => {
    const title = this.capitalize(this.context.location.pathname.replace('/', ''))
    if (title === '') {
      return 'Now'
    }
    else {
      return title
    }
  }

  render() {
    const style = {
      drawer: {
        overflow: 'hidden'
      },
      CommonAppbar: {
        color: this.context.muiTheme.palette.lightText,
        zIndex: 1
      },
      MenuItem: {
        fill: this.context.muiTheme.palette.lightText,
        color: this.context.muiTheme.palette.lightText
      }
    }

    return (
      <div>
        <Appbar
          ref="CommonAppbar"
          title={this.getPageTitle()}
          onLeftIconButtonTouchTap={this.handleToggle}
          className="leftMenuButton"
          style={style.CommonAppbar}
          titleStyle={style.CommonAppbar}
        >
          <div>
            settings
          </div>
        </Appbar>
        <Drawer
          containerStyle={style.drawer}
          docked={false} open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <List>
            <ListItem
              disabled={true}
              className="avatar"
              leftAvatar={
                <Avatar src="icon-128.png" />
              }
            >
              Tabatron
            </ListItem>
          </List>
          <Menu onItemTouchTap={this.changePage}>
            <MenuItem
              innerDivStyle={this.isActive('/')}
              primaryText="Now"
              value="/"
              leftIcon={
                <Today style={this.isActiveIcon('/')} />
              }
            />
            <MenuItem
              innerDivStyle={this.isActive('/visited')}
              primaryText="Visited"
              value="/visited"
              leftIcon={
                <History style={this.isActiveIcon('/visited')} />
              }
            />
            <MenuItem
              innerDivStyle={this.isActive('/saved')}
              primaryText="Saved"
              value="/saved"
              leftIcon={
                <Save style={this.isActiveIcon('/saved')} />
              }
            />
            <Divider />
            <MenuItem
              innerDivStyle={this.isActive('/settings')}
              primaryText="Settings"
              value="/settings"
              leftIcon={
                <Settings style={this.isActiveIcon('/settings')} />
              }
            />
            <MenuItem
              innerDivStyle={this.isActive('/about')}
              primaryText="About" value="/about"
              leftIcon={
                <Help style={this.isActiveIcon('/about')} />
              }
            />
          </Menu>
        </Drawer>
      </div>
    )
  }
}

CommonAppbar.contextTypes = {
  location: PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired
}
