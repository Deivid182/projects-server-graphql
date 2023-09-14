import gql from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    hello: String
    projects: [Project]
    project(id: ID!): Project
    tasks: [Task]
    task(id: ID!): Task
  },

  type Mutation {
    createProject(name: String!, description: String!): Project
    createTask(title: String!, projectId: ID!): Task
    deleteProject(id: ID!): Project
    deleteTask(id: ID!): Task
    updateProject(id: ID!, name: String, description: String): Project
    updateTask(id: ID!, title: String): Task
  }

  type Project {
    _id: ID
    name: String
    description: String
    createdAt: String
    updatedAt: String
    tasks: [Task]
  }

  type Task {
    _id: ID
    title: String
    project: Project
    createdAt: String
    updatedAt: String
  }
`