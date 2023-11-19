import User from "../models/User"
import IUserRepository from "./IUserRepository"
import {UserAttributes} from "../models/UserAttributes"

export default class UserRepository implements IUserRepository {
  async createUser(user: UserAttributes): Promise<boolean> {
    let createdUser = await User.create(user)
    return !!createdUser
  }

  async readUserByEmail(email: string): Promise<User | null> {
    return await User.findOne({
      where: {
        email
      }
    })
  }
}