import React from 'react'
import {ReactDOM, render} from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

// All the views and inner views
import Main from './Main'

// routes
import Now from '../views/Now'
import Visited from '../views/Visited'
import Saved from '../views/Saved'
import Searches from '../views/Searches'
import Analytics from '../views/Analytics'
import Settings from '../views/Settings'
import About from '../views/About'

//Needed for onTouchTap
//Can go away when react 1.0 release
//NOTE https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render

render((
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Now}/>
      <Route path="/now" component={Now}/>
      <Route path="/visited" component={Visited}/>
      <Route path="/saved" component={Saved}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))
