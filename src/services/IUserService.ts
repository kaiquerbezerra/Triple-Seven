import UserRepository from "../repositories/UserRepository"
import { CreationAttributes } from "sequelize"
import {ValidationError} from "yup"
import User from "../models/User"

export default interface IUserService {
  userRepository: UserRepository

  create(newUser: CreationAttributes<User>): Promise<boolean>
  loginUser(email: string, password: string): Promise<string>
  verifyAutoApproval(userRole: string): boolean
  validateNewUser(newUser: CreationAttributes<User>): CreationAttributes<User> | ValidationError
  validateEmail(email: string): boolean
}