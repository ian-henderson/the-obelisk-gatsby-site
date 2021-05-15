import { graphql, PageProps, useStaticQuery } from "gatsby"
import React, { ReactNode } from "react"
import { CryptoAddress, Layout, SEO } from "../components"

export default function About({ location }: PageProps): ReactNode {
  const {
    site: {
      siteMetadata: { bitcoinAddress /* buyMeACoffeeUsername */ },
    },
  } = useStaticQuery(staticQuery)

  const title = "About The Obelisk"
  const description = ""

  return (
    <Layout {...{ location }}>
      <SEO {...{ description, title }} />
      <article itemScope itemType="http://schema.org/Article">
        <h1 itemProp="headline">{title}</h1>
      </article>
      <CryptoAddress address={bitcoinAddress} name="Bitcoin" />
    </Layout>
  )
}

const staticQuery = graphql`
  query {
    site {
      siteMetadata {
        bitcoinAddress
        buyMeACoffeeUsername
      }
    }
  }
`
