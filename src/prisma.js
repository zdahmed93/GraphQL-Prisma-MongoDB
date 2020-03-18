import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466/'
})

// prisma.query.users(null, '{ id name email posts {id title body published} }')
//             .then(data => console.log(JSON.stringify({users: data}, null, 2)))
//             .catch(error => console.log({error}))

// prisma.query.comments(null, '{ id text author { id name } }')
//             .then(data => console.log(JSON.stringify({comments: data}, null, 2)))
//             .catch(error => console.log({error}))

prisma.mutation.createPost({
    data: {
        title: "Prisma with NodeJS",
        body: "Prisma is awesome :D ",
        published: true,
        author: {
            connect: {
                id: "5e71fbcf0274390007244957"
            }
        }
    }
}, '{id title body published}').then(data => {
                console.log(JSON.stringify(data, null, 4))
                return prisma.query.users(null, '{ id name email posts {id title body published} }')
            })
            .then(users => console.log(JSON.stringify({users}, null, 2)))
            .catch(error => console.log({error}))
            

prisma.mutation.updatePost({
    data: {
        body: "Prisma is an excellent tool",
        published: false
    },
    where: {
        id: "5e723b6c0274390007244964"
    }
    
},
'{id body published}'
).then(post => {
    console.log(JSON.stringify({post}, null, 2))
    return prisma.query.posts(null, '{id title body author {name}}')
}).then(posts => {
    console.log(JSON.stringify({posts}, null, 4))
}).catch(error => console.log({error}))


