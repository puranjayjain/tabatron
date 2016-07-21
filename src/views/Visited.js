import React, {PropTypes, Component} from 'react'

import Subheader from 'material-ui/Subheader'
import FlatButton from 'material-ui/FlatButton'
import {GridList, GridTile} from 'material-ui/GridList'
import {Card, CardActions, CardTitle} from 'material-ui/Card'

export default class Visited extends Component {
  getSessions = () => {
    chrome.runtime.sendMessage('sessions', (response) => {
      console.info(response)
      for (let i in response) {
        // var m = moment.tz(parseInt(response[i]), moment.tz.guess());
        // //new card
        // var $session__newItem = $session__item.clone();
        // //set the list data
        // $session__newItem.find('#demo-menu-lower-right').attr('id', 'mbutton-' + i);
        // $session__newItem.find('.mdl-menu').attr('for', 'mbutton-' + i);
        // $session__newItem.find('.mdl-list__item-primary-content b').html(m.format('D MMM'));
        // $session__newItem.find('.mdl-list__item-title').html(m.format('YYYY'));
        // $session__newItem.find('.mdl-list__item-sub-title').html(m.format('h:m A'));
        // $session__view.append($session__newItem);
      }
    })
  }

  render() {
    this.getSessions()

    return (
      <div>
        <GridList
          cols={6}
          cellHeight={144}
          //style={styles.gridList}
        >
          <Card>
            <CardTitle
              title="Card title"
              subtitle="Card subtitle"
            />
            <CardActions>
              <FlatButton label="Explore" />
              <FlatButton label="Restore" />
            </CardActions>
          </Card>
          <Card>
            <CardTitle
              title="Card title"
              subtitle="Card subtitle"
            />
            <CardActions>
              <FlatButton label="Explore" />
              <FlatButton label="Restore" />
            </CardActions>
          </Card>
          <Card>
            <CardTitle
              title="Card title"
              subtitle="Card subtitle"
            />
            <CardActions>
              <FlatButton label="Explore" />
              <FlatButton label="Restore" />
            </CardActions>
          </Card>
          <Card>
            <CardTitle
              title="Card title"
              subtitle="Card subtitle"
            />
            <CardActions>
              <FlatButton label="Explore" />
              <FlatButton label="Restore" />
            </CardActions>
          </Card>
          <Card>
            <CardTitle
              title="Card title"
              subtitle="Card subtitle"
            />
            <CardActions>
              <FlatButton label="Explore" />
              <FlatButton label="Restore" />
            </CardActions>
          </Card>
          <Card>
            <CardTitle
              title="Card title"
              subtitle="Card subtitle"
            />
            <CardActions>
              <FlatButton label="Explore" />
              <FlatButton label="Restore" />
            </CardActions>
          </Card>
          <Card>
            <CardTitle
              title="Card title"
              subtitle="Card subtitle"
            />
            <CardActions>
              <FlatButton label="Explore" />
              <FlatButton label="Restore" />
            </CardActions>
          </Card>
        </GridList>
      </div>
    )
  }
}

Visited.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}
