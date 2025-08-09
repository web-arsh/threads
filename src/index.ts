
import { expressMiddleware } from '@as-integrations/express5';
import express from "express"
import { prismaClient } from './lib/db.js';
import createApolloServer from './graphql/index.js';

async function  startServer() {
        
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

    app.use(express.json());

    app.get("/",(req,res) => {
        res.send("Server Created.")
    });

    app.use("/graphql",expressMiddleware(await createApolloServer()));

    app.listen(PORT, () => console.log(`Server Started ${PORT}`));
}


startServer();