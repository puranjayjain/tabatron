import React, {PropTypes, Component} from 'react'

import FlatButton from 'material-ui/FlatButton'
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

export default class Breadcrumbs extends Component {
  static propTypes = {
    /**
    * all th Breadcrumb's [{ text and url }]
    */
    children: PropTypes.array
  }

  getItems = (type) => {
    let items = []
    for (let child of this.props.children) {
      items.push(child[type])
    }
    return items
  }

  render() {
    const style = {
      container: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 24px'
      },
      flatButton: {
        color: this.context.muiTheme.palette.greenText
      },
      innerContainer: {
        display: 'flex',
        alignItems: 'center'
      }
    },
    children = this.props.children.slice(1),
    urls = this.getItems('url')

    return (
      <div style={style.container}>
        <FlatButton
          label={this.props.children[0].text}
          style={style.flatButton}
        />
        {children.map((row, index) => (
          <span
            style={style.innerContainer}
            key={index}>
            <KeyboardArrowRight color={this.context.muiTheme.palette.greenText} />
            <FlatButton
              label={row.text}
              style={style.flatButton}
            />
          </span>
        ))}
      </div>
    )
  }
}

Breadcrumbs.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}
