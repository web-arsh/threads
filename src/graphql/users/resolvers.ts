import { prismaClient } from "../../lib/db.js";

const queries = {
    hello: () => 'Hello I am graphql server',
    say: (_,{name}:{name: string}) => `Hey ${name}, How are you?`
};

const mutation = {
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
};

export const resolvers = {queries,mutation}