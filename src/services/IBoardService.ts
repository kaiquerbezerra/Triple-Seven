import BoardRepository from "../repositories/BoardRepository"
import { CreationAttributes } from "sequelize"
import {ValidationError} from "yup"
import Board from "../models/Board"
import { Page } from "../models/Page"

export default interface IBoardService {
  boardRepository: BoardRepository

  validateNewBoard(newBoard: CreationAttributes<Board>): CreationAttributes<Board> | ValidationError
  verifyBoardAutoApproval(boardId: number, userId: number | undefined): Promise<boolean>
  edit(boardId: number, editedBoard: CreationAttributes<Board>): Promise<boolean>
  create(adminId: number, newBoard: CreationAttributes<Board>): Promise<boolean>
  enter(userId: number, boardId: number): Promise<boolean>
  findAll(pagination: Page): Promise<Page>
  remove(boardId: number): Promise<boolean>
}