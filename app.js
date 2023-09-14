import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import http from 'http';
import { PORT } from './config.js';

export async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const serverHttp = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use('/graphql', cors(), express.json(), expressMiddleware(server));

  await new Promise((resolve) => serverHttp.listen({ port: PORT }, resolve));
}
