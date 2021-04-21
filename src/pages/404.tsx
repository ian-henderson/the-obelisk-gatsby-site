import * as React from "react"
import { graphql } from "gatsby"

// prettier-ignore
import { Layout, SEO } from "../components"

export default function NotFoundPage({ data, location }) {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle} {...{ location }}>
      <SEO title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
