import SprintService from "../services/SprintService"
import { IAuthRequest } from "../middlewares/IAuthRequest"
import { Response } from "express"

export default interface ISprintController {
  getSprintService(): SprintService
  postSprint(req: IAuthRequest, res: Response): Promise<Response>
  getSprints(req: IAuthRequest, res:Response): Promise<Response>
  patchSprint(req: IAuthRequest, res: Response): Promise<Response>
  deleteSprint(req: IAuthRequest, res: Response): Promise<Response>
  getSprintById(req: IAuthRequest, res: Response): Promise<Response>
}