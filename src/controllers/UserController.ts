import { CreationAttributes } from "sequelize"
import { Request, Response } from "express"
import { ValidationError } from "yup"
import IUserController from "./IUserController"
import UserService from "../services/UserService"
import User from "../models/User"
import { IAuthRequest } from "../middlewares/IAuthRequest"

class UserController implements IUserController {
  constructor(
    private readonly userService: UserService
  ) {}

  async postUser(req: Request, res: Response): Promise<Response> {
    let newUser = req.body
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

  async patchUser({userData, body, params}: IAuthRequest, res: Response): Promise<Response> {
    let userId = parseInt(params.id)
    if (userId !== userData!.id) {
      return res.status(403).json({
        success: false,
        message: "Edições de outros usuários são inválidas"
      })
    }
    let editedUser = body
    let validatedEditedUser: Omit<CreationAttributes<User>, 'password'> | ValidationError = this.userService.validateEditedUser(editedUser)
    if (validatedEditedUser instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        message: validatedEditedUser.message,
        providedValues: validatedEditedUser.value
      })
    }
    let wasEditionSuccessful = await this.userService.edit(userId, validatedEditedUser)
    if (!wasEditionSuccessful) {
      return res.status(500).json({
        success: false,
        message: 'Erro: Usuário não foi editado.'
      })
    }
    return res.status(201).json({
      success: true,
      message: 'Usuário editado com sucesso!'
    })
  }

  async deleteUser({userData, params}: IAuthRequest, res: Response): Promise<Response> {
    let userId = parseInt(params.id)
    console.log(userId, userData?.id)
    if (userId !== userData?.id) {
      return res.status(403).json({
        success: false,
        message: "Deleção de outros usuários são inválidas"
      })
    }
    let wasDeletionSuccessful = await this.userService.remove(userId)
    if (!wasDeletionSuccessful) {
      return res.status(500).json({
        success: false,
        message: 'Erro: Usuário não foi deletado.'
      })
    }
    return res.status(201).json({
      success: true,
      message: 'Usuário deletado com sucesso!'
    })
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
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
        })
      } else {
        return res.status(500).json({
          success: false,
          message: 'Falha na autenticação',
          error: error.message
        })
      }
    }
  }

  getUserService(): UserService {
    return this.userService
  }
}
export default UserController