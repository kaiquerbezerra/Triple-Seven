import User from '../models/User'
import UserSchema from "../models/UserSchema"
import UserRepository from "../repositories/UserRepository"
import IUserService from "./IUserService";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {ValidationError} from "yup"
import { CreationAttributes } from "sequelize"
import validator from 'validator'
import { UserValidationError } from '../errors/userValidationError';


export default class UserService implements IUserService{
  constructor(
      public userRepository: UserRepository
  ) {}

  async create(newUser: CreationAttributes<User>): Promise<boolean> {
    if(!this.validateEmail(newUser.email)){
      throw new UserValidationError('CPF')
  }
    try{
      UserSchema.validateSync(newUser)
      const password = await bcrypt.hash(newUser.password, 10);

      return await this.userRepository.createUser({
          ... newUser,
          password
      })
    }catch(error){
      if (error instanceof ValidationError && error.path){
        throw new UserValidationError(error.path, error.value)
      }else {
        throw new Error('O email informado já foi cadastrado')
      }
    }
  }

  async loginUser(email: string, password: string): Promise<string> {
    const user = await this.userRepository.readUserByEmail(email)

    if (!user) {
        throw new Error('Usuário não encontrado')
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Credenciais inválidas')
    }

    let token: string
    token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || '101010', {
        expiresIn: '12h'
    });

    return token
}

  verifyAutoApproval(userRole: string): boolean {
    return userRole === "Master" || userRole === "Developer"
  }

  validateNewUser(newUser: CreationAttributes<User> | null): CreationAttributes<User> | ValidationError {
    try {
      return UserSchema.validateSync(newUser)
    } catch (error) {
      return error as ValidationError
    }
  }

  validateEmail(email: string): boolean {
    return validator.isEmail(email)
  }
}
