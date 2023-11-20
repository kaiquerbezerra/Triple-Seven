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

  async removeUser(userId: number): Promise<boolean> {
    let removedUser = await User.destroy({
      where: {
        id: userId
      }
    })
    return removedUser > 0
  }

  async editUser(userId: number, modifications: Omit<UserAttributes, 'password'>): Promise<boolean> {
    let editedUser = await User.update(modifications, {
      where: {
        id: userId
      }
    })
    return editedUser[0] > 0
  }
}