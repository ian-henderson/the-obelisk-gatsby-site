const path = require("path")

exports.createPages = ({ graphql, actions: { createPage } }) => {
  /*
  const createAuthorPagesPromise = new Promise((resolve, reject) => {
    const component = path.resolve("./src/templates/author-posts.tsx")

    const query = ``

    const handleResult = result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      // ...
    }

    resolve(graphql(query).then(handleResult))
  })
  */

  const createBlogPostsPromise = new Promise((resolve, reject) => {
    const component = path.resolve("./src/templates/blog-post.tsx")

    const query = `
      {
        allContentfulBlogPost {
          edges {
            node {
              author {
                slug
              }
              id
              slug
              title
            }
          }
        }
      }
    `

    const handleResult = result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      const posts = result.data.allContentfulBlogPost.edges

      posts.forEach(({ node: { author, id, slug } }, i) => {
        createPage({
          component,
          context: {
            id,
            nextPostId: i === posts.length - 1 ? null : posts[i + 1].node.id,
            previousPostId: i === 0 ? null : posts[i - 1].node.id,
          },
          path: `/${author?.slug}/${slug}/`,
        })
      })
    }

    resolve(graphql(query).then(handleResult))
  })

  return Promise.all([/* createAuthorPages, */ createBlogPostsPromise])
}
