import React, { Component } from "react"
import Page from "../src/Layout/Containers/Page"
import { SITE_TITLE } from "./_document"
import Section from "../src/Builder/Containers/Section"
import Toolbar from "../src/Builder/Containers/Toolbar"

const EMPTY_SECTION = {}

const TEMPLATE = [
  { content: "Hello" },
  { content: "This is just simple example", attributes: { color: "red" } },
  {
    content: "You could change background color.",
    attributes: { backgroundColor: "red", color: "white" }
  },
  { content: "Set background image (Try now)" }
]

const STORAGE_KEY = "localTemplate"
const loadTemplate = () => {
  let data = null
  try {
    data = JSON.parse(localStorage.getItem(STORAGE_KEY))
  } catch (e) {}

  return data
}

@Page({
  title: SITE_TITLE,
  pathname: "/"
})
export default class Home extends Component {
  state = {
    sections: TEMPLATE,
    loaded: false,
    activeSection: null
  }

  componentDidMount() {
    const loaded = true

    const localCopy = loadTemplate()
    if (localCopy) {
      return this.setState({ sections: localCopy, loaded })
    }

    this.setState({ loaded })
  }

  addSection = section =>
    this.setState(prevState => ({
      sections: [...prevState.sections, section]
    }))

  save = () =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.sections))

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
    const { loaded } = this.state

    return (
      <div className="page">
        <Toolbar
          onAdd={() => this.addSection(EMPTY_SECTION)}
          onSave={() => this.save()}
        />
        <Editor>{loaded ? this.renderSections() : <Loading />}</Editor>
      </div>
    )
  }
}

const Editor = ({ children }) => <div className="editor">{children}</div>
const Loading = () => <span>...</span>
