export type BlogPost = {
  author: Person
  body: {
    childMarkdownRemark: {
      html: string
    }
  }
  description: {
    childMarkdownRemark: {
      excerpt: string
    }
    internal: {
      content: string
    }
  }
  heroImage: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fluid: any
  }
  publishDate: string
  slug: string
  title: string
}

export type Person = {
  image: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gatsbyImageData: any
  }
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
