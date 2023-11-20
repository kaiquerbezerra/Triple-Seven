import { CreationAttributes } from "sequelize"
import { Response } from "express"
import { ValidationError } from "yup"
import ISprintController from "./ISprintController"
import SprintService from "../services/SprintService"
import Sprint from "../models/Sprint"
import { IAuthRequest } from "../middlewares/IAuthRequest"
import { Page } from "../models/Page"

class SprintController implements ISprintController {
  constructor(
    private readonly userService: SprintService
  ) {}

  async postSprint({ body }: IAuthRequest, res: Response): Promise<Response> {
    let newSprint = body
    let validatedNewSprint: CreationAttributes<Sprint> | ValidationError = this.userService.validateNewSprint(newSprint)
    if (validatedNewSprint instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        message: validatedNewSprint.message,
        providedValues: validatedNewSprint.value
      })
    }
    let wasCreationSuccessful = await this.userService.create(validatedNewSprint)
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

  async patchSprint({ body, params}: IAuthRequest, res: Response): Promise<Response> {
    let sprintId = parseInt(params.id)
    let editedSprint = body
    let validatedEditedSprint: CreationAttributes<Sprint> | ValidationError = this.userService.validateNewSprint(editedSprint)
    if (validatedEditedSprint instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        message: validatedEditedSprint.message,
        providedValues: validatedEditedSprint.value
      })
    }
    let wasEditionSuccessful = await this.userService.edit(sprintId, validatedEditedSprint)
    if (!wasEditionSuccessful) {
      return res.status(500).json({
        success: false,
        message: 'Erro: Sprint não foi editada.'
      })
    }
    return res.status(201).json({
      success: true,
      message: 'Sprint editada com sucesso!'
    })
  }

  async deleteSprint({userData, params}: IAuthRequest, res: Response): Promise<Response> {
    let sprintId = parseInt(params.id)
    if (await this.userService.verifySprintAutoApproval(sprintId, userData?.id) === false) {
      return res.status(403).json({
        success: false,
        message: "Apenas o admin pode deletar sprints"
      })
    }
    let wasDeletionSuccessful = await this.userService.remove(sprintId)
    if (!wasDeletionSuccessful) {
      return res.status(500).json({
        success: false,
        message: 'Erro: Sprint não foi deletada.'
      })
    }
    return res.status(201).json({
      success: true,
      message: 'Sprint deletada com sucesso!'
    })
  }

  async getSprints({ query }: IAuthRequest, res: Response): Promise<Response> {
    try {
      let pagination = new Page(query)
      let boardSprints = await this.userService.findAll(pagination)
      return res.status(200).json({
        error: {
            status: false,
            message: 'Informações obtidas com sucesso'
        },
        boardSprints
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

  getSprintService(): SprintService {
    return this.userService;
  }
}
export default SprintController;