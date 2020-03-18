import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466/'
})


prisma.mutation.createPost({
    data: {
        title: "Prisma",
        body: "Prisma is awesome",
        published: true,
        author: {
            connect: {
                id: "5e71fbcf0274390007244957"
            }
        }
    }
}, '{id title body published}').then(data => console.log(JSON.stringify(data, null, 4)))
                               .catch(error => console.log({error}))

