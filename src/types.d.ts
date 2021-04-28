export type BlogPost = {
  author: Person
  body: {
    childMarkdownRemark: {
      html: string
    }
  }
  description: {
    internal: {
      content: string
    }
  }
  publishDate: string
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
