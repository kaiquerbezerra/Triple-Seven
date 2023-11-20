import SprintRepository from "../repositories/SprintRepository"
import { CreationAttributes } from "sequelize"
import {ValidationError} from "yup"
import Sprint from "../models/Sprint"
import { Page } from "../models/Page"

export default interface ISprintService {
  sprintRepository: SprintRepository

  validateNewSprint(newSprint: CreationAttributes<Sprint>): CreationAttributes<Sprint> | ValidationError
  edit(sprintId: number, editedSprint: CreationAttributes<Sprint>): Promise<boolean>
  create(newSprint: CreationAttributes<Sprint>): Promise<boolean>
  findAll(boardId: number, pagination: Page): Promise<Page>
  verifySprintAutoApproval(sprintId: number, userId: number | undefined): Promise<boolean>
  remove(sprintId: number): Promise<boolean>
}