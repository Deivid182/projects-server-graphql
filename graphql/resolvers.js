import Project from '../models/Project.js'
import Task from '../models/Task.js'

export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    projects: async () => await Project.find(),
    tasks: async () => await Task.find(),
    project: async (_, { id }) => await Project.findById(id),
    task: async (_, { id }) => await Task.findById(id)
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

      const taskSaved = await newTask.save()
      return taskSaved
    },
    deleteProject: async (_, { id }) => {
      const projectDeleted = await Project.findByIdAndDelete(id)

      if(!projectDeleted) {
        throw new Error('Project not found')
      }

      await Task.deleteMany({ projectId: id })

      return projectDeleted
    },
    deleteTask: async (_, { id }) => {
      const taskDeleted = await Task.findByIdAndDelete(id)
      if(!taskDeleted) {
        throw new Error('Task not found')
      }
      return taskDeleted
    },
    updateProject: async (_, { id, name, description }) => {
      const project = await Project.findById(id)

      if(!project) {
        throw new Error('Project not found')
      }

      project.name = name || project.name
      project.description = description || project.description

      const projectUpdated = await project.save()

      return projectUpdated
    },
    updateTask: async (_, { id, title }) => {
      const task = await Task.findById(id)

      if(!task) {
        throw new Error('Task not found')
      }

      task.title = title || task.title
      const taskUpdated = await task.save()

      return taskUpdated
    }
  },

  Project: {
    tasks: async(parent) => await Task.find({ projectId: parent._id })
  },

  Task: {
    project: async(parent) => await Project.findById(parent.projectId)
  }
}