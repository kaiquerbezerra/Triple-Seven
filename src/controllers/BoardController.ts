import { CreationAttributes } from "sequelize"
import { Response } from "express"
import { ValidationError } from "yup"
import IBoardController from "./IBoardController"
import BoardService from "../services/BoardService"
import Board from "../models/Board"
import { IAuthRequest } from "../middlewares/IAuthRequest"
import { Page } from "../models/Page"

class BoardController implements IBoardController {
  constructor(
    private readonly boardService: BoardService
  ) {}

  async postBoard({ userData, body }: IAuthRequest, res: Response): Promise<Response> {
    if (!userData?.id) {
      return res.status(403).json({
        success: false,
        message: "Apenas o usuários cadastrados podem editar o quadro"
      })
    }
    
    let newBoard = body
    let validatedNewBoard: CreationAttributes<Board> | ValidationError = this.boardService.validateNewBoard(newBoard)
    if (validatedNewBoard instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        message: validatedNewBoard.message,
        providedValues: validatedNewBoard.value
      })
    }
    let wasCreationSuccessful = await this.boardService.create(userData?.id, validatedNewBoard)
    if (!wasCreationSuccessful) {
      return res.status(500).json({
        success: false,
        message: "Board não foi cadastrado."
      })
    }
    return res.status(201).json({
      success: true,
      message: "Board cadastrado com sucesso!"
    })
  }

  async patchBoard({ userData, body, params}: IAuthRequest, res: Response): Promise<Response> {
    let boardId = parseInt(params.id)
    if (await this.boardService.verifyBoardAutoApproval(boardId, userData?.id) === false) {
      return res.status(403).json({
        success: false,
        message: "Apenas o admin pode editar o quadro"
      })
    }
    let editedBoard = body
    let validatedEditedBoard: CreationAttributes<Board> | ValidationError = this.boardService.validateNewBoard(editedBoard)
    if (validatedEditedBoard instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        message: validatedEditedBoard.message,
        providedValues: validatedEditedBoard.value
      })
    }
    let wasEditionSuccessful = await this.boardService.edit(boardId, validatedEditedBoard)
    if (!wasEditionSuccessful) {
      return res.status(500).json({
        success: false,
        message: 'Board não foi editado.'
      })
    }
    return res.status(201).json({
      success: true,
      message: 'Board editado com sucesso!'
    })
  }

  async deleteBoard({userData, params}: IAuthRequest, res: Response): Promise<Response> {
    let boardId = parseInt(params.id)
    if (await this.boardService.verifyBoardAutoApproval(boardId, userData?.id) === false) {
      return res.status(403).json({
        success: false,
        message: "Apenas o admin pode deletar o quadro"
      })
    }
    let wasDeletionSuccessful = await this.boardService.remove(boardId)
    if (!wasDeletionSuccessful) {
      return res.status(500).json({
        success: false,
        message: 'Board não foi deletado.'
      })
    }
    return res.status(201).json({
      success: true,
      message: 'Board deletado com sucesso!'
    })
  }

  async getBoards({ query }: IAuthRequest, res: Response): Promise<Response> {
    try {
      let pagination = new Page(query)
      let boards = await this.boardService.findAll(pagination)
      return res.status(200).json({
        error: {
            status: false,
            message: 'Informações obtidas com sucesso'
        },
        boards
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

  async inviteBoard({ userData, params }: IAuthRequest, res: Response): Promise<Response> {
    if (!userData?.id) {
      return res.status(403).json({
        success: false,
        message: "Apenas o usuários cadastrados podem entrar em um quadro"
      })
    }
    try{
      let boardId = parseInt(params.id)
      let wasInviteSuccessful = await this.boardService.enter(userData.id, boardId)
      if (!wasInviteSuccessful) {
        return res.status(500).json({
          success: false,
          message: 'Não foi possível entrar no quadro.'
        })
      }
      return res.status(201).json({
        success: true,
        message: 'Convite aceito com sucesso!'
      })
    } catch(error) {
      return res.status(500).json({
        error: {
            status: true,
            message: 'Erro no servidor',
            erro: error
        },
      })
    }
  }

  getBoardService(): BoardService {
    return this.boardService
  }
}
export default BoardController