import { PORT } from './config.js';
import { startApolloServer } from './app.js';
import { typeDefs } from './graphql/type-defs.js';
import { resolvers } from './graphql/resolvers.js';
import { connectDB } from './db.js';

connectDB();

startApolloServer(typeDefs, resolvers)
