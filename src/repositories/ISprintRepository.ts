import { CreationAttributes } from "sequelize"
import Sprint from "../models/Sprint"
import {SprintAttributes} from "../models/SprintAttributes"
import { Page } from "../models/Page"

export default interface ISprintRepository {
  createSprint(newSprint: SprintAttributes): Promise<boolean>
  findAllSprints(boardId:number, page: Page): Promise<Page>
  removeSprint(taskId: number): Promise<boolean>
  editSprint(taskId: number, changes: CreationAttributes<Sprint>): Promise<boolean>
  verifySprintOwnerPermission(sprintId: number, userId: number | undefined): Promise<boolean>
}