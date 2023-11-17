import UserService from "../services/UserService"
import { IAuthRequest } from "../middlewares/IAuthRequest"
import { Request, Response } from "express"

export default interface IUserController {
    getUserService(): UserService
    postUser(req: IAuthRequest, res: Response): Promise<Response>
    login(req: Request, res: Response): Promise<Response>
    //getUsers(req: IAuthRequest, res:Response): Promise<Response>
    //patchUser(req: IAuthRequest, res: Response): Promise<Response>
    //deleteUser(req: IAuthRequest, res: Response): Promise<Response>
    //getUserById(req: IAuthRequest, res: Response): Promise<Response>
}