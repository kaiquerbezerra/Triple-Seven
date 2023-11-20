import { CreationAttributes } from "sequelize"
import IBoardRepository from "./IBoardRepository"
import Board from "../models/Board"
import UserBoard from "../models/UserBoard"
import { Page } from "../models/Page"
import { BoardAttributes } from "../models/BoardAttributes"
import Task from "../models/Task"
import Sprint from "../models/Sprint"

export default class BoardRepository implements IBoardRepository {
  async createBoard(userId: number, newBoard: CreationAttributes<Board>): Promise<boolean> {
    let createdBoard = await Board.create(newBoard)
    let userBoardRelation = {
      userId: userId,
      boardId: createdBoard.id,
      isAdmin: true
    }
    let createdRelation = await UserBoard.create(userBoardRelation)
    return !!createdRelation && !!userBoardRelation
	}

	async findAllBoards(page: Page): Promise<Page> {
		const { count, rows } = await Board.findAndCountAll({
			attributes: ['id', 'name'],
			offset: page.offset,
			limit: page.size,
		})
		page.content = rows
		page.registersCount = count
		return page
	}

  async removeBoard(boardId: number): Promise<boolean> {
    try {
      let deletedBoardRows = await Board.destroy({ where: { id: boardId } })
      console.log(deletedBoardRows)
      return deletedBoardRows > 0
    } catch (error) {
      console.log(error)
      throw new Error("Erro ao deletar a board")
    }
  }

  async editBoard(boardId: number, changes: BoardAttributes): Promise<boolean> {
    console.log(changes)
    let affectedCount = await Board.update(changes, {
      where: { 
        id: boardId 
      }
    })
    console.log(affectedCount[0])
    return affectedCount[0] > 0
  }

  async verifyBoardOwnerPermission(boardId: number, userId: number | undefined): Promise<boolean>  {
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