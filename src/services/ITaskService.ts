import TaskRepository from "../repositories/TaskRepository"
import { CreationAttributes } from "sequelize"
import {ValidationError} from "yup"
import Task from "../models/Task"
import { Page } from "../models/Page"

export default interface ITaskService {
  taskRepository: TaskRepository

  validateNewTask(newTask: CreationAttributes<Task>): CreationAttributes<Task> | ValidationError
  edit(taskId: number, editedTask: CreationAttributes<Task>): Promise<boolean>
  create(newTask: CreationAttributes<Task>): Promise<boolean>
  findAll(pagination: Page): Promise<Page>
  findOne(taskId: number): Promise<Task | null>
  verifyTaskAutoApproval(taskId: number, userId: number): Promise <boolean>
  remove(taskId: number): Promise<boolean>
}