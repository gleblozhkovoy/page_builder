import React, { Component } from "react"
import Page from "../src/Layout/Containers/Page"
import { SITE_TITLE } from "./_document"
import Container from "../src/Pages/Components/Container"


function * gen(val) {
  for (let i = 0 ; i < 5 ; i++) yield i;
  
  return val
}

function sum(gen, res = 0) {
  const val = gen.next().value
  if (val !== undefined) {
    return sum(gen, val+res)
  } else {
    return res
  }
}

@Page({
  title: SITE_TITLE,
  pathname: "/"
})
export default class Home extends Component {
  
  componentDidMount() {
    const myGen = gen()
    const val = sum(myGen)
    console.log(val)  
    debugger
  }
  
  
  render() {
    return (
      <div className="page">
        test
      </div>
    )
  }
}
