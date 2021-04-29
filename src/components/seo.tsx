import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

declare const window: any

interface ISEO {
  description?: string
  lang?: string
  meta?: Array<Object>
  title?: string
}

const staticQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

export default function SEO({ description, lang, meta, title }: ISEO) {
  const {
    site: {
      siteMetadata: {
        description: metaDescription = description,
        title: metaTitle = title,
      },
    },
  } = useStaticQuery(staticQuery)

  const [theme, setTheme] = React.useState(null)
  React.useEffect(() => setTheme(window.__theme), [setTheme])

  return (
    <Helmet
      htmlAttributes={{ lang }}
      meta={[
        ...(meta || []),
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
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
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `theme-color`,
          content: theme === "light" ? "white" : "#181a1b",
        },
      ]}
      title={title}
      titleTemplate={title ? `%s | ${metaTitle}` : metaTitle}
    />
  )
}

SEO.defaultProps = {
  description: ``,
  lang: `en`,
  meta: [],
}
