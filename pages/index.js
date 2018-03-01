import React, { Component } from "react"
import Page from "../src/Layout/Containers/Page"
import { SITE_TITLE } from "./_document"
import Section from "../src/Builder/Containers/Section"

const EMPTY_SECTION = {}

const TEMPLATE = [
  { content: "Hello" },
  { content: "This is just simple example", attributes: { color: "red" } },
  { content: "You could change background color.", attributes: { backgroundColor: "red", color: 'white' } },
  { content: "Set background image (Try now)" }
]

@Page({
  title: SITE_TITLE,
  pathname: "/"
})
export default class Home extends Component {
  state = {
    sections: TEMPLATE,
    activeSection: null
  }

  addSection = section =>
    this.setState(prevState => ({
      sections: [...prevState.sections, section]
    }))

  removeSection = oldSection => {
    debugger
    this.setState(prevState => ({
      sections: prevState.sections.filter(section => section !== oldSection)
    }))
  }

  chooseSection = activeSection =>
    this.setState({
      activeSection
    })

  updateContent = (sectionToUpdate, content) =>
    this.setState(prevState => ({
      sections: prevState.sections.map(section => {
        if (section === sectionToUpdate) {
          return {
            ...sectionToUpdate,
            content
          }
        }

        return section
      })
    }))

  updateAttributes = (sectionToUpdate, newAttributes) =>
    this.setState(prevState => ({
      sections: prevState.sections.map(section => {
        if (section === sectionToUpdate) {
          return {
            ...sectionToUpdate,
            attributes: {
              ...section.attributes,
              ...newAttributes
            }
          }
        }

        return section
      })
    }))

  renderSections = () =>
    this.state.sections.map((section, i) => (
      <Section
        {...section}
        id={i}
        key={i}
        selected={i === this.state.activeSection}
        onRemove={() => this.removeSection(section)}
        onChoose={() => this.chooseSection(i)}
        onContentChange={content => this.updateContent(section, content)}
        onAttributeChange={attribute =>
          this.updateAttributes(section, attribute)
        }
      />
    ))

  render() {
    return (
      <div className="page">
        <div className="editor">
          {this.renderSections()}
          <AddButton
            className="section_add"
            onClick={() => this.addSection(EMPTY_SECTION)}
          >
            add section
          </AddButton>
        </div>
      </div>
    )
  }
}

const AddButton = ({ children, ...rest }) => (
  <button {...rest}>
    <i />
    <span>{children}</span>
  </button>
)
