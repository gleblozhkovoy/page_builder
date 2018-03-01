import React from "react"
import Document, { Head, Main, NextScript } from "next/document"

import "../styles/global.less"
const base = process.env.BACKEND_URL ? process.env.BACKEND_URL : ""

export const SITE_TITLE = "Page Builder Example"

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <title>{SITE_TITLE}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="stylesheet" href={`${base}/_next/static/style.css`} />
          <link
            href="https://use.fontawesome.com/releases/v5.0.6/css/all.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
