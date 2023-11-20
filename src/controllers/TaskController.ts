import { CreationAttributes } from "sequelize"
import { Response } from "express"
import { ValidationError } from "yup"
import ITaskController from "./ITaskController"
import TaskService from "../services/TaskService"
import Task from "../models/Task"
import { IAuthRequest } from "../middlewares/IAuthRequest"
import { Page } from "../models/Page"

class TaskController implements ITaskController {
  constructor(
    private readonly userService: TaskService
  ) {}

  async postTask({userData, body}: IAuthRequest, res: Response): Promise<Response> {
    let newTask = body
    let validatedNewTask: CreationAttributes<Task> | ValidationError = this.userService.validateNewTask(newTask)
    if (validatedNewTask instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        message: validatedNewTask.message,
        providedValues: validatedNewTask.value
      })
    }
    let wasCreationSuccessful = await this.userService.create(validatedNewTask)
    if (!wasCreationSuccessful) {
      return res.status(500).json({
        success: false,
        message: 'Erro: Task não foi cadastrada.'
      })
    }
    return res.status(201).json({
      success: true,
      message: 'Task cadastrada com sucesso!'
    })
  }

  async patchTask({userData, body, params}: IAuthRequest, res: Response): Promise<Response> {
    let taskId = parseInt(params.id)
    if (!userData?.id) {
      return res.status(404).json({
        message: "Edição apenas para usuários cadastrados"
      })
    }
    if (await this.userService.verifyTaskAutoApproval(taskId, userData.id) === false) {
      return res.status(403).json({
        success: false,
        message: "Edições de tasks de outros usuários não são permitidas"
      })
    }
    let editedTask = body
    let validatedEditedTask: CreationAttributes<Task> | ValidationError = this.userService.validateNewTask(editedTask)
    if (validatedEditedTask instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        message: validatedEditedTask.message,
        providedValues: validatedEditedTask.value
      })
    }
    let wasEditionSuccessful = await this.userService.edit(userData.id, validatedEditedTask)
    if (!wasEditionSuccessful) {
      return res.status(500).json({
        success: false,
        message: 'Erro: Task não foi editada.'
      })
    }
    return res.status(201).json({
      success: true,
      message: 'Task editada com sucesso!'
    })
  }

  async deleteTask({userData, params}: IAuthRequest, res: Response): Promise<Response> {
    let taskId = parseInt(params.id)
    if (!userData?.id) {
      return res.status(404).json({
        message: "Deleção apenas para usuários autorizados"
      })
    }
    if (await this.userService.verifyTaskAutoApproval(taskId, userData.id) === false) {
      return res.status(403).json({
        success: false,
        message: "Deleção de tasks de outros usuários são inválidas"
      })
    }
    let wasDeletionSuccessful = await this.userService.remove(taskId)
    if (!wasDeletionSuccessful) {
      return res.status(500).json({
        success: false,
        message: 'Erro: Task não foi deletada.'
      })
    }
    return res.status(201).json({
      success: true,
      message: 'Task deletada com sucesso!'
    })
  }

  async getTasks({ userData, query }: IAuthRequest, res: Response): Promise<Response> {
    try {
      let pagination = new Page(query)
      let sprintTasks = await this.userService.findAll(pagination)
      return res.status(200).json({
        error: {
            status: false,
            message: 'Informações obtidas com sucesso'
        },
        sprintTasks
    })
    } catch (error) {
        return res.status(500).json({
            error: {
                status: true,
                message: 'Erro no servidor',
                erro: error
            },
        })
    }
  }

  async getTaskById({ userData, params }: IAuthRequest, res: Response): Promise<Response> {
    try {
      let taskId = parseInt(params.id)
      let task = await this.userService.findOne(taskId)
      return res.status(200).json({
        error: {
            status: false,
            message: 'Informações obtidas com sucesso'
        },
        task
    })
    } catch (error) {
        return res.status(500).json({
            error: {
                status: true,
                message: 'Erro no servidor',
                erro: error
            },
        })
    }
  }

  getTaskService(): TaskService {
    return this.userService;
  }
}
export default TaskController;