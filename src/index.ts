import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import express from "express"

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
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello I am graphql server',
                say: (_,{name}:{name: string}) => `Hey ${name}, How are you?`
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