import Task from '../models/Task'
import TaskSchema from "../models/TaskSchema"
import TaskRepository from "../repositories/TaskRepository"
import ITaskService from "./ITaskService";
import {ValidationError} from "yup"
import { CreationAttributes } from "sequelize"
import { TaskValidationError } from '../errors/taskValidationError';
import { Page } from '../models/Page';

export default class TaskService implements ITaskService{
  constructor(
      public taskRepository: TaskRepository
  ) {}

  async create(newTask: CreationAttributes<Task>): Promise<boolean> {
    return await this.taskRepository.createTask(newTask)
  }

  async findAll(pagination: Page): Promise<Page>{
    return await this.taskRepository.findAllTasks(pagination)
  }

  async findOne(taskId: number): Promise<Task | null> {
    return await this.taskRepository.findTask(taskId)
  }

  async remove(taskId: number): Promise<boolean> {
    return await this.taskRepository.removeTask(taskId)
  }

  async edit(taskId: number, editedTask: CreationAttributes<Task>): Promise<boolean> {
    try{
      return await this.taskRepository.editTask(taskId, editedTask)
    }catch(error){
      if (error instanceof ValidationError && error.path){
        throw new TaskValidationError(error.path, error.value)
      }else {
        throw new Error('Nome já existente')
      }
    }
  }

  verifyTaskAutoApproval(taskId: number, userId: number): Promise<boolean> {
    return this.taskRepository.verifyTaskOwnerPermission(taskId, userId)
  }

  validateNewTask(newTask: CreationAttributes<Task> | null): CreationAttributes<Task> | ValidationError {
    try {
      return TaskSchema.validateSync(newTask)
    } catch (error) {
      return error as ValidationError
    }
  }
}
