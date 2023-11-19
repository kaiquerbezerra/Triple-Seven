import { CreationAttributes } from "sequelize"
import { Response } from "express"
import { ValidationError } from "yup"
import ITaskController from "./ITaskController"
import TaskService from "../services/TaskService"
import Task from "../models/Task"
import { IAuthRequest } from "../middlewares/IAuthRequest"

class TaskController implements ITaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

    async postTask({userData, body}: IAuthRequest, res: Response): Promise<Response> {
        let newTask = body
        let validatedNewTask: CreationAttributes<Task> | ValidationError = this.taskService.validateNewTask(newTask)
        if (validatedNewTask instanceof ValidationError) {
            return res.status(400).json({
              success: false,
              message: validatedNewTask.message,
              providedValues: validatedNewTask.value
            })
        }
        let wasCreationSuccessful = await this.taskService.create(validatedNewTask)
        if (!wasCreationSuccessful) {
            return res.status(500).json({
              success: false,
              message: 'Erro: Usuário não foi cadastrado.'
            })
        }
        return res.status(201).json({
          success: true,
          message: 'Usuário cadastrado com sucesso!'
        })
    }

  getTaskService(): TaskService {
    return this.taskService;
  }
}
export default TaskController;