import { CreationAttributes } from "sequelize"
import Task from "../models/Task"
import {TaskAttributes} from "../models/TaskAttributes"
import { Page } from "../models/Page"

export default interface ITaskRepository {
  createTask(user: TaskAttributes): Promise<boolean>
  findAllTasks(page: Page): Promise<Page>
  findTask(taskId: number): Promise<Task | null>
  removeTask(taskId: number): Promise<boolean>
  editTask(taskId: number, changes: CreationAttributes<Task>): Promise<boolean>
  verifyTaskOwnerPermission(taskId: number, userId: number): Promise<boolean>
}