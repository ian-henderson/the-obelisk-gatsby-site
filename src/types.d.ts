export type ContentfulBlogPost = {
  author: ContentfulPerson
  body: {
    childMarkdownRemark: {
      html: string
    }
  }
  description: {
    childMarkdownRemark: {
      excerpt: string
      html: string
    }
    internal: {
      content: string
    }
  }
  heroImage: {
    description: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fluid: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gatsbyImageData: any
  }
  publishDate: string
  slug: string
  title: string
}

export type ContentfulPerson = {
  bitcoinAddress: string
  buyMeACoffeeUsername: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any
  name: string
  shortBio: {
    shortBio: string
  }
  slug: string
  title: string
}

export type Site = {
  siteMetadata: {
    bitcoinAddress: string
    buyMeACoffeeUsername: string
    description: string
    siteUrl: string
    social: {
      twitter: string
    }
    title: string
  }
}
