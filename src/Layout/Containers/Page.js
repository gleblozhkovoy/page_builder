import React, { Component } from "react"
import Head from "next/head"

import "../../../styles/global.less"

const page = args => WrappedComponent => {
  return class PageWrapper extends Component {
    static getInitialProps(ctx) {
      let props = {}

      if (WrappedComponent.getInitialProps) {
        props = { ...WrappedComponent.getInitialProps(ctx) }
      }

      return {
        ...props
      }
    }

    render() {
      let { title } = args
      return (
        <div>
          <Head>
            <title>{title}</title>
          </Head>
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
}

export default page
