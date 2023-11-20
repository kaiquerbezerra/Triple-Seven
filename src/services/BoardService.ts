import Board from '../models/Board'
import BoardSchema from "../models/BoardSchema"
import BoardRepository from "../repositories/BoardRepository"
import IBoardService from "./IBoardService"
import {ValidationError} from "yup"
import { CreationAttributes } from "sequelize"
import { BoardValidationError } from '../errors/boardValidationError'
import { Page } from '../models/Page'

export default class BoardService implements IBoardService{
  constructor(
      public boardRepository: BoardRepository
  ) {}

  async create(adminId: number, newBoard: CreationAttributes<Board>): Promise<boolean> {
    return await this.boardRepository.createBoard(adminId, newBoard)
  }

  async findAll(pagination: Page): Promise<Page>{
    return await this.boardRepository.findAllBoards(pagination)
  }

  async remove(boardId: number): Promise<boolean> {
    return await this.boardRepository.removeBoard(boardId)
  }

  async edit(boardId: number, editedBoard: CreationAttributes<Board>): Promise<boolean> {
    try{
      return await this.boardRepository.editBoard(boardId, editedBoard)
    }catch(error){
      if (error instanceof ValidationError && error.path){
        throw new BoardValidationError(error.path, error.value)
      }else {
        throw new Error('Nome já existente')
      }
    }
  }

  async verifyBoardAutoApproval(boardId: number, userId: number | undefined): Promise <boolean> {
    return await this.boardRepository.verifyBoardOwnerPermission(boardId, userId)
  }

  validateNewBoard(newBoard: CreationAttributes<Board> | null): CreationAttributes<Board> | ValidationError {
    try {
      return BoardSchema.validateSync(newBoard)
    } catch (error) {
      return error as ValidationError
    }
  }
}
