import { CreationAttributes } from "sequelize"
import Board from "../models/Board"
import {BoardAttributes} from "../models/BoardAttributes"
import { Page } from "../models/Page"

export default interface IBoardRepository {
  createBoard(userId: number, newBoard: BoardAttributes): Promise<boolean>
  enterBoard(userId: number, boardId: number): Promise<boolean>
  findAllBoards(page: Page): Promise<Page>
  removeBoard(boardId: number): Promise<boolean>
  editBoard(boardId: number, changes: CreationAttributes<Board>): Promise<boolean>
  verifyBoardOwnerPermission(boardId: number, userId: number | undefined): Promise<boolean>
}