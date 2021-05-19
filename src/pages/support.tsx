import { graphql, PageProps, useStaticQuery } from "gatsby"
import React, { ReactNode } from "react"
import { BuyMeACoffeeLink, CryptoAddress, Layout, SEO } from "../components"

export default function About({ location }: PageProps): ReactNode {
  const {
    site: {
      siteMetadata: { bitcoinAddress, buyMeACoffeeUsername },
    },
  } = useStaticQuery(staticQuery)

  const title = "Support the team"

  const description = `
    The Obelisk is an ad-free, community-supported publication that focuses on 
    emerging industries and technologies. Support development with Bitcoin or 
    buy the team a coffee!
  `

  return (
    <Layout {...{ location }}>
      <SEO {...{ description, title }} />
      <article itemScope itemType="http://schema.org/Article">
        <h1 itemProp="headline">{title}</h1>
        <p>{description}</p>
        <h2>With Bitcoin</h2>
        <CryptoAddress address={bitcoinAddress} name="BTC" />
        <h2>
          <BuyMeACoffeeLink
            text="With Coffee"
            username={buyMeACoffeeUsername}
          />
        </h2>
      </article>
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
