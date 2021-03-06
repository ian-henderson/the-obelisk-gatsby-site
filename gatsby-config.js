// eslint-disable-next-line @typescript-eslint/no-var-requires
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
    description: `Description`,
    siteUrl: `https://theobelisk.co`,
    social: {
      twitter: ``,
    },
    bitcoinAddress: `bc1qls59wpcmlgjelnawyxmt80l3zz2uhpmnq0ses5`,
    buyMeACoffeeUsername: `iancurtis`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `theobelisk.co`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-styled-components`,
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
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 100,
        },
      },
    },
    `gatsby-transformer-sharp`,
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
        theme_color: `#181a1b`,
        display: `minimal-ui`,
        icon: `src/images/obelisk-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
