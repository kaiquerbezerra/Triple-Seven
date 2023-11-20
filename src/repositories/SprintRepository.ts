import { CreationAttributes } from "sequelize"
import ISprintRepository from "./ISprintRepository"
import Sprint from "../models/Sprint"
import UserBoard from "../models/UserBoard";
import { Page } from "../models/Page";
import { SprintAttributes } from "../models/SprintAttributes";
import Board from "../models/Board";
import Task from "../models/Task";

export default class SprintRepository implements ISprintRepository {
    async createSprint(newSprint: CreationAttributes<Sprint>): Promise<boolean> {
		let createdSprint = await Sprint.create(newSprint);
		return !!createdSprint;
	}

	async findAllSprints(boardId: number, page: Page): Promise<Page> {
		const { count, rows } = await Sprint.findAndCountAll({
      where: {
        boardId: boardId
      },
      include: {
        model: Task,
        as: 'tasks'
      },
			attributes: ['id', 'name'],
			offset: page.offset,
			limit: page.size,
		})
		page.content = rows
		page.registersCount = count
		return page;
	}

  async removeSprint(sprintId: number): Promise<boolean> {
    try {
        await Task.destroy({
        where: {
          sprintId: sprintId
        }
      })
      let deletedSprintRows = await Sprint.destroy({ where: { id: sprintId } })
      console.log(deletedSprintRows)
      return deletedSprintRows > 0
    } catch (error) {
      console.log(error)
      throw new Error("Erro ao deletar a sprint")
    }
  }

  async editSprint(sprintId: number, changes: SprintAttributes): Promise<boolean> {
    console.log(changes)
    let affectedCount = await Sprint.update(changes, {
      where: { 
        id: sprintId 
      }
    })
    console.log(affectedCount[0])
    return affectedCount[0] > 0
  }

  async verifySprintOwnerPermission(sprintId: number, userId: number | undefined): Promise<boolean>  {
    const sprintBoard = await Sprint.findOne({
      where: { 
        id: sprintId 
      },
      include: [{
      model: Board,
      as: 'boards'
      }]
    })

    let boardId = sprintBoard?.boardId as unknown as number 
    
    if (boardId === undefined || userId === undefined) {
      return false
    }
    const isUserBoardAdmin = await UserBoard.findOne({
      where: {
        userId: userId,
        boardId: boardId
      }
    })

    let isAdmin = isUserBoardAdmin?.isAdmin as unknown as boolean
    
    if (!isAdmin) {
      return false
    } 
    return true
  }
}