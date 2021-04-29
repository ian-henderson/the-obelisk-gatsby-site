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
    fluid: any
  }
  publishDate: string
  slug: string
  title: string
}

export type Person = {
  image: {
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
    description: string
    siteUrl: string
    social: {
      twitter: string
    }
    title: string
  }
}
