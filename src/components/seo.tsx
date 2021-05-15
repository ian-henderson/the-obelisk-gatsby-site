import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

interface ISEO {
  description?: string;
  lang?: string;
  meta?: Array<Record<string, string>>;
  title?: string;
}

export default function SEO(props: ISEO): ReactNode {
  const {
    site: { siteMetadata },
  } = useStaticQuery(staticQuery)

  const [theme, setTheme] = React.useState(null)
  React.useEffect(() => setTheme(window.__theme), [setTheme])

  const title = props.title || siteMetadata.title
  const description = props.description || siteMetadata.description

  const meta = [
    {
      name: `description`,
      content: description,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: description,
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
      content: description,
    },
    {
      name: `theme-color`,
      content: theme === "light" ? "white" : "#181a1b",
    },
    ...props.meta,
  ]

  return (
    <Helmet
      defaultTitle={siteMetadata.title}
      htmlAttributes={{ lang: props.lang }}
      title={props.title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      {...{ meta }}
    />
  )
}

SEO.defaultProps = {
  description: ``,
  lang: `en`,
  meta: [],
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
