import React, { Component } from "react"
import selection from "../../hoc/Selection/Selection"

@selection()
export default class Section extends Component {
  state = {
    editable: false,
    value: this.props.content
  }

  static defaultProps = {
    onContentChange: () => {}
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.editable) {
      this.setState({
        value: nextProps.content
      })
    }
  }

  onInput = e => {
    if (!this.state.editable) {
      this.setState({ editable: true })
    }
    
    this.handleChange(e)
  }

  onBlur = () => {
    this.setState({ editable: false })
    this.props.onContentChange(this.state.value)
  }

  handleChange = e => {
    const value = e.target.textContent
    this.setState({ value })
  }
  
  computeStyles = () => this.props.attributes

  render() {
    const html = this.props.editable ? this.state.value : this.props.content

    return (
      <div
        style={this.computeStyles()}
        className="section"
        contentEditable={true}
        onInput={this.onInput}
        onBlur={this.onBlur}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }
}
