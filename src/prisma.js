import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466/'
})

const createPostForUser = async (authorId, data) => {
    const userExists = await prisma.exists.User({id: authorId})
    if (!userExists) {
        throw new Error('User not found')
    }
    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    },
    '{id author {id name email posts {id title body}}}'
    )
    return post.author
}

createPostForUser('5e71f8c00274390007244955', {
    title: 'Another more NoSQL',
    body: 'more and more',
    published: false
}).then(user => console.log(JSON.stringify({user}, null, 4)))
  .catch(error => console.log({error: error.message}))

const updatePostForUser = async (postId, data) => {
    const postExists = await prisma.exists.Post({id: postId})
    if (!postExists) {
        throw new Error('Post not found')
    }
    const post = await prisma.mutation.updatePost({
        data,
        where: {
            id: postId
        }
    }, '{id author {id name email posts {id title body}}}')
    return post.author
}

updatePostForUser('5e71fa940274390007244956', {
    title: 'new title ',
    body: 'second body update',
    published: true
}).then(user => console.log(JSON.stringify({user}, null, 4)))
  .catch(error => console.log({error: error.message}))



