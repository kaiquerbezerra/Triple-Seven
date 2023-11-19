import { CreationAttributes } from "sequelize"
import { Request, Response } from "express"
import { ValidationError } from "yup"
import ISprintController from "./ISprintController"
import SprintService from "../services/SprintService"
import Sprint from "../models/Sprint"

class SprintController implements ISprintController {
  constructor(
    private readonly sprintService: SprintService
  ) {}

  async postSprint(req: Request, res: Response): Promise<Response> {
    let newSprint = req.body
    let validatedNewSprint: CreationAttributes<Sprint> | ValidationError = this.sprintService.validateNewSprint(newSprint)
    if (validatedNewSprint instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        message: validatedNewSprint.message,
        providedValues: validatedNewSprint.value
      })
    }
    let wasCreationSuccessful = await this.sprintService.create(validatedNewSprint)
    if (!wasCreationSuccessful) {
      return res.status(500).json({
        success: false,
        message: 'Erro: Sprint não foi cadastrada.'
      })
    }
    return res.status(201).json({
      success: true,
      message: 'Sprint cadastrada com sucesso!'
    })
  }
  getSprintService(): SprintService {
    return this.sprintService;
  }
}
export default SprintController;