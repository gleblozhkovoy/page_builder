import React, { Component } from "react"
import cn from "classnames"
import "./styles.less"
import Gear, { DELETE, CHANGE_BG, CHANGE_COLOR, SET_IMG } from "../../Containers/Gear"

const selection = args => WrappedComponent => {
  return class Selection extends Component {
    static defaultProps = {
      onChoose: () => {},
      onRemove: () => {},
      onAttributeChange: () => {}
    }

    handleClick = () => this.props.onChoose()

    handleAction = (action, args) => {
      switch (action) {
        case DELETE:
          return this.props.onRemove()
        case SET_IMG:
        case CHANGE_BG:
        case CHANGE_COLOR:
          return this.props.onAttributeChange(args)
      }
    }

    render() {
      const { selected } = this.props
      return (
        <div
          onClick={this.handleClick}
          className={cn("selection", { active: selected })}
        >
          {selected && <Gear onAction={this.handleAction} />}
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
}

export default selection
