import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import express from "express"
import { prismaClient } from './lib/db.js';

async function  startServer() {
        
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

    app.use(express.json());

    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query{
                hello: String
                say(name: String): String
            }
            
            type Mutation{
                createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello I am graphql server',
                say: (_,{name}:{name: string}) => `Hey ${name}, How are you?`
            },
            Mutation: {
                createUser: async (_ , {firstName, lastName, email, password}: {firstName: string, lastName: string, email: string, password: string}) => {
                    await prismaClient.user.create({
                        data:{
                            firstName,
                            lastName,
                            email,
                            password,
                            salt: "random_salt"
                        },
                    });
                    return true;
                }
                
            }
        }
    });

    await gqlServer.start();

    app.get("/",(req,res) => {
        res.send("Server Created.")
    });

    app.use("/graphql",expressMiddleware(gqlServer));

    app.listen(PORT, () => console.log(`Server Started ${PORT}`));
}


startServer();