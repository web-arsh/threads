import { ApolloServer } from '@apollo/server';
import { User } from './users/index.js';

async function createApolloServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query{
                ${User.typeDefs}
            }
            
            type Mutation{
                ${User.mutation}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutation
            }
        }
    });

    await gqlServer.start();

    return gqlServer;
}

export default createApolloServer