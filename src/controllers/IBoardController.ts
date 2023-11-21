import BoardService from "../services/BoardService"
import { IAuthRequest } from "../middlewares/IAuthRequest"
import { Response } from "express"

export default interface IBoardController {
  getBoardService(): BoardService
  inviteBoard(req: IAuthRequest, res: Response): Promise<Response>
  postBoard(req: IAuthRequest, res: Response): Promise<Response>
  getBoards(req: IAuthRequest, res:Response): Promise<Response>
  patchBoard(req: IAuthRequest, res: Response): Promise<Response>
  deleteBoard(req: IAuthRequest, res: Response): Promise<Response>
}