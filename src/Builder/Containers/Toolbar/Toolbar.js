import React, { Component } from "react"

import './styles.less'

const ActionButton = ({ children, ...rest }) => (
  <button {...rest}>
    <i />
    <span>{children}</span>
  </button>
)

export default class Toolbar extends Component {
  
  static defaultProps = {
    onAdd: () => {},
    onSave: () => {}
  }
  
  render() {
    const {onAdd, onSave} = this.props
    
    return (
      <div className="toolbar">
        <ActionButton
          className="button section_add"
          onClick={onAdd}
        >
          add section
        </ActionButton>
        <ActionButton
          className="button save"
          onClick={onSave}
        >
          save
        </ActionButton>
      </div>
    )
  }
}
