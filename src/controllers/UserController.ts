import { IAuthRequest } from "../middlewares/IAuthRequest"
import { CreationAttributes } from "sequelize"
import { Request, Response } from "express"
import { ValidationError } from "yup"
import IUserController from "./IUserController"
import UserService from "../services/UserService"
import User from "../models/User"


class UserController implements IUserController {

    constructor(
        private readonly userService: UserService
    ) {}

    async postUser({ userData, body }: IAuthRequest, res: Response): Promise<Response> {
        let newUser = body as any;
        let isApproved = this.userService.verifyAutoApproval(userData?.role!)
        let validatedNewUser: CreationAttributes<User> | ValidationError = this.userService.validateNewUser(newUser)
        if (validatedNewUser instanceof ValidationError) {
            return res.status(400).json({
                success: false,
                message: validatedNewUser.message,
                providedValues: validatedNewUser.value
            })
        }
        let wasCreationSuccessful = await this.userService.create(validatedNewUser)
        if (!wasCreationSuccessful) {
            return res.status(500).json({
                success: false,
                message: 'Erro: Usuário não foi cadastrado.'
            })
        }
        return res.status(201).json({
            success: true,
            message: 'Usuário cadastrado com sucesso!'
        })
    }

    async login(req: Request, res: Response): Promise<Response> {
      const { email, password } = req.body;
      try {
        const token = await this.userService.loginUser(email, password)
        return res.status(200).json({
          success: true,
          token: token 
        })
      }catch(error: any){
          if (error.message === 'User not found' || error.message === 'Invalid credentials') {
            return res.status(401).json({
              success: false,
              message: 'Usuário ou senha incorretos',
              error: error.message
            });
          } else {
              return res.status(500).json({
                success: false,
                message: 'Falha na autenticação',
                error: error.message
              });
          }
      }
  }
  
    getUserService(): UserService {
        return this.userService;
    }
}
export default UserController;