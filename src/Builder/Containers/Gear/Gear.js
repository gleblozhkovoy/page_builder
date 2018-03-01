import React, { Component } from "react"
import cn from 'classnames'
import "./styles.less"

export const DELETE = 'delete'
export const CHANGE_BG = 'bg_change'
export const SET_IMG = 'bg_image_change'
export const CHANGE_COLOR = 'text_color_change'

const DEFAULT_BG_IMAGE = 'https://i.ytimg.com/vi/DKbkKJWYT6E/maxresdefault.jpg'

const DEFAULT_OPTIONS = [
  {title: 'Delete', action: DELETE},
  {title: 'Change Background Image', action: SET_IMG},
  {title: 'Change Background Color', action: CHANGE_BG},
  {title: 'Change Color', action: CHANGE_COLOR},
]

export default class Gear extends Component {

  state = {
    open: false
  }
  
  static defaultProps = {
    onAction: () => {},
    options: DEFAULT_OPTIONS
  }

  onItemClick = (action) => {
    this.closeMenu()
    
    let args = {}
    
    if (action === CHANGE_BG) {
      args.backgroundColor = 'red'
    }
    
    if (action === CHANGE_COLOR) {
      args.color = 'white'
    } 
    
    if (action === SET_IMG) {
      args.backgroundImage = `url("${DEFAULT_BG_IMAGE}")`
      args.backgroundSize = 'contain'
    }
    
    this.props.onAction(action, args)
  }
  
  renderOption = ({title, action}) => 
    <div className="option" key={action} onClick={() => this.onItemClick(action)}>
      {title}
    </div>
  
  renderOptions = ()  =>
    <div className="options">
      {this.props.options.map(this.renderOption)}
    </div>

  toggleMenu = () => this.setState(prevState => ({
    open: !prevState.open
  }))
  
  closeMenu = () => this.setState({ open: false })
  
  render() {
    const { open } = this.state
    return (
      <div className={cn('gear')}>
        <div className="button" onClick={this.toggleMenu}/>
        {open && this.renderOptions()} 
      </div>
    )
  }
}
