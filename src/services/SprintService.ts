import Sprint from '../models/Sprint'
import SprintSchema from "../models/SprintSchema"
import SprintRepository from "../repositories/SprintRepository"
import ISprintService from "./ISprintService"
import {ValidationError} from "yup"
import { CreationAttributes } from "sequelize"
import { SprintValidationError } from '../errors/sprintValidationError'
import { Page } from '../models/Page'

export default class SprintService implements ISprintService{
  constructor(
      public sprintRepository: SprintRepository
  ) {}

  async create(newSprint: CreationAttributes<Sprint>): Promise<boolean> {
    return await this.sprintRepository.createSprint(newSprint)
  }

  async findAll(boardId:number, pagination: Page): Promise<Page>{
    return await this.sprintRepository.findAllSprints(boardId, pagination)
  }

  async remove(sprintId: number): Promise<boolean> {
    return await this.sprintRepository.removeSprint(sprintId)
  }

  async edit(sprintId: number, editedSprint: CreationAttributes<Sprint>): Promise<boolean> {
    try{
      return await this.sprintRepository.editSprint(sprintId, editedSprint)
    }catch(error){
      if (error instanceof ValidationError && error.path){
        throw new SprintValidationError(error.path, error.value)
      }else {
        throw new Error('Nome já existente')
      }
    }
  }

  async verifySprintAutoApproval(sprintId: number, userId: number | undefined): Promise <boolean> {
    return await this.sprintRepository.verifySprintOwnerPermission(sprintId, userId)
  }

  validateNewSprint(newSprint: CreationAttributes<Sprint> | null): CreationAttributes<Sprint> | ValidationError {
    try {
      return SprintSchema.validateSync(newSprint)
    } catch (error) {
      return error as ValidationError
    }
  }
}
