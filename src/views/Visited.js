import React, {PropTypes, Component} from 'react'

import Subheader from 'material-ui/Subheader'
import FlatButton from 'material-ui/FlatButton'
import {GridList, GridTile} from 'material-ui/GridList'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

export default class Visited extends Component {
  render() {
    return (
      <div>
        <GridList
          cellHeight={200}
          //style={styles.gridList}
        >
          <Card>
            <CardHeader
              title="URL Avatar"
              subtitle="Subtitle"
            />
            <CardTitle title="Card title" subtitle="Card subtitle" />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </CardText>
            <CardActions>
              <FlatButton label="Explore" />
              <FlatButton label="Restore" />
            </CardActions>
          </Card>
          <Card>
            <CardHeader
              title="URL Avatar"
              subtitle="Subtitle"
            />
            <CardTitle title="Card title" subtitle="Card subtitle" />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </CardText>
            <CardActions>
              <FlatButton label="Explore" />
              <FlatButton label="Restore" />
            </CardActions>
          </Card>
          <Card>
            <CardHeader
              title="URL Avatar"
              subtitle="Subtitle"
            />
            <CardTitle title="Card title" subtitle="Card subtitle" />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </CardText>
            <CardActions>
              <FlatButton label="Explore" />
              <FlatButton label="Restore" />
            </CardActions>
          </Card>
          <Card>
            <CardHeader
              title="URL Avatar"
              subtitle="Subtitle"
            />
            <CardTitle title="Card title" subtitle="Card subtitle" />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </CardText>
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
