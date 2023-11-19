import TaskService from "../services/TaskService"
import { IAuthRequest } from "../middlewares/IAuthRequest"
import { Response } from "express"

export default interface ITaskController {
  getTaskService(): TaskService
  postTask(req: IAuthRequest, res: Response): Promise<Response>
  //getTasks(req: IAuthRequest, res:Response): Promise<Response>
  //patchTask(req: IAuthRequest, res: Response): Promise<Response>
  //deleteTask(req: IAuthRequest, res: Response): Promise<Response>
  //getTaskById(req: IAuthRequest, res: Response): Promise<Response>
}