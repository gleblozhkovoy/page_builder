import React, { Component } from "react"
import Page from "../src/Layout/Containers/Page"
import { SITE_TITLE } from "./_document"
import Section from "../src/Builder/Containers/Section"

const EMPTY_SECTION = {}

@Page({
  title: SITE_TITLE,
  pathname: "/"
})
export default class Home extends Component {
  state = {
    sections: [],
    activeSection: null
  }

  addSection = section =>
    this.setState(prevState => ({
      sections: [...prevState.sections, section]
    }))

  removeSection = oldSection =>
    this.setState(prevState => ({
      sections: prevState.sections.filter(section => section !== oldSection)
    }))

  chooseSection = activeSection =>
    this.setState({
      activeSection
    })

  renderSections = () =>
    this.state.sections.map((section, i) => (
      <Section
        {...section}
        id={i}
        key={i}
        isActive={i === this.state.activeSection}
        onRemove={() => this.removeSection(section)}
        onChoose={() => this.chooseSection(i)}
      />
    ))

  render() {
    return (
      <div className="page">
        {this.renderSections()}
        <button onClick={() => this.addSection(EMPTY_SECTION)}>
          + section
        </button>
      </div>
    )
  }
}
