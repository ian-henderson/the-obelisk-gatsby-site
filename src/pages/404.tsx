import { graphql, PageProps } from "gatsby"
import React from "react"
// prettier-ignore
import { Layout, SEO } from "../components"
import { Site } from "../types"

type DataProps = {
  site: Site,
}

export default function NotFoundPage({
  data,
  location,
}: PageProps<DataProps>): JSX.Element {
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
