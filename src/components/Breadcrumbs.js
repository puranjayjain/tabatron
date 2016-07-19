import React, {PropTypes, Component} from 'react'

import keyboard_arrow_right from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

export default class Breadcrumbs extends Component {
  static propTypes = {
    /**
    * all th Breadcrumbs' text
    */
    children: PropTypes.array
  }

  render() {
    const style = {
      arrow: {
        background: this.context.muiTheme.palette.accent1Color,
      }
    }

    const children = this.props.children.pop()

    return (
      <div>
        {children.map((text) => (
          <keyboard_arrow_right />
          <FlatButton
            label={text}
            primary={true}
          />
        ))}
      </div>
    )
  }
}

Breadcrumbs.contextTypes = {
  muiTheme: PropTypes.object.isRequired
}
