import Project from '../models/Project.js'
import Task from '../models/Task.js'

export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    projects: async () => await Project.find().populate('tasks'),
    tasks: async () => await Task.find(),
    project: async (_, { id }) => await Project.findById(id).populate('tasks')
  },

  Mutation: {
    createProject: async (_, { name, description }) => {
      const newProject = new Project({
        name,
        description
      })
      const projectSaved = await newProject.save()
      return projectSaved
    },

    createTask : async (_, { title, projectId }) => {
      const exisitingProject = await Project.findById(projectId)

      if (!exisitingProject) {
        throw new Error('Project not found')
      }

      const newTask = new Task({
        title,
        projectId
      })

      exisitingProject.tasks.push(newTask)

      await exisitingProject.save()

      const taskSaved = await newTask.save()
      return taskSaved
    }
  }

}