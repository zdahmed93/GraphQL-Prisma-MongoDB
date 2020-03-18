import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466/'
})

prisma.query.users(null, '{ id name email posts {id title published} }')
            .then(data => console.log(JSON.stringify({users: data}, null, 2)))
            .catch(error => console.log({error}))

prisma.query.comments(null, '{ id text author { id name } }')
            .then(data => console.log(JSON.stringify({comments: data}, null, 2)))
            .catch(error => console.log({error}))