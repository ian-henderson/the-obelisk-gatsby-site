import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

interface ISEO {
  description?: string;
  lang?: string;
  meta?: Array<Record<string, string>>;
  title?: string;
}

const staticQuery = graphql`
  query {
    site {
      siteMetadata {
        description
        title
      }
    }
  }
`

export default function SEO({
  description,
  lang,
  title,
  ...props
}: ISEO): JSX.Element {
  const {
    site: {
      siteMetadata: {
        description: siteDescription = description,
        title: siteTitle,
      },
    },
  } = useStaticQuery(staticQuery)

  const [theme, setTheme] = React.useState(null)
  React.useEffect(() => setTheme(window.__theme), [setTheme])

  const meta = [
    {
      name: `description`,
      content: siteDescription,
    },
    {
      property: `og:title`,
      content: title || siteTitle,
    },
    {
      property: `og:description`,
      content: siteDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:title`,
      content: title || siteTitle,
    },
    {
      name: `twitter:description`,
      content: siteDescription,
    },
    {
      name: `theme-color`,
      content: theme === "light" ? "white" : "#181a1b",
    },
    ...props.meta,
  ]

  return (
    <Helmet
      defaultTitle={siteTitle}
      htmlAttributes={{ lang }}
      titleTemplate={`%s | ${siteTitle}`}
      {...{ meta, title }}
    />
  )
}

SEO.defaultProps = {
  description: ``,
  lang: `en`,
  meta: [],
}
