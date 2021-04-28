require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

const contentfulConfig = {
  accessToken: process.env.CONTENTFUL_HOST
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN ||
      process.env.CONTENTFUL_DELIVERY_TOKEN,
  host: process.env.CONTENTFUL_HOST,
  spaceId: process.env.CONTENTFUL_SPACE_ID,
}

// If you want to use the preview API please define
// CONTENTFUL_HOST and CONTENTFUL_PREVIEW_ACCESS_TOKEN in your
// environment config.
//
// CONTENTFUL_HOST should map to `preview.contentful.com`
// CONTENTFUL_PREVIEW_ACCESS_TOKEN should map to your
// Content Preview API token
//
// For more information around the Preview API check out the documentation at
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
//
// To change back to the normal CDA, remove the CONTENTFUL_HOST variable from your environment.

const { spaceId, accessToken } = contentfulConfig
if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided."
  )
}

module.exports = {
  siteMetadata: {
    title: `The Obelisk`,
    description: `Tag line`,
    siteUrl: `https://theobelisk.crypto`,
    social: {
      twitter: ``,
    },
  },
  pathPrefix: "__GATSBY_IPFS_PATH_PREFIX__",
  plugins: [
    "gatsby-plugin-ipfs",
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `theobelisk.crypto`,
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { allContentfulBlogPost, site } }) =>
              allContentfulBlogPost.edges.map(({ node }) => ({
                custom_elements: [
                  { "content:encoded": node.body.childMarkdownRemark.html },
                ],
                date: node.publishDate,
                description: node.description.description,
                guid: site.siteMetadata.siteUrl + node.slug,
                title: node.title,
                url: site.siteMetadata.siteUrl + node.slug,
              })),
            query: `
              {
                allContentfulBlogPost(
                  sort: {fields: publishDate, order: DESC}
                ) {
                  edges {
                    node {
                      slug
                      body {
                        childMarkdownRemark {
                          html
                        }
                      }
                      description {
                        description
                      }
                      publishDate
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The Obelisk`,
        short_name: `The Obelisk`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffa7c4`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
