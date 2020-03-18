import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466/'
})

const createPostForUser = async (authorId, data) => {
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
    '{id}'
    )
    const user = await prisma.query.user({
        where: {
            id: authorId
        }
    }, '{id name email posts {id title body}}')
    return user
}

createPostForUser('5e71fe2c027439000724495a', {
    title: 'more NoSQL',
    body: 'more and more',
    published: false
}).then(user => console.log(JSON.stringify({user}, null, 4)))

const updatePostForUser = async (postId, data) => {
    const post = await prisma.mutation.updatePost({
        data,
        where: {
            id: postId
        }
    }, '{id author {id}}')
    const user = await prisma.query.user({
        where: {
            id: post.author.id
        }
    }, '{id name email posts {id title body}}')
    return user
}

updatePostForUser('5e724c360274390007244966', {
    body: 'updated body',
    published: true
}).then(user => console.log(JSON.stringify({user}, null, 4)))



