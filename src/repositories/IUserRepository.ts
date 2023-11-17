import User from "../models/User"
import {UserAttributes} from "../models/UserAttributes"

export default interface IUserRepository {
  createUser(user: UserAttributes): Promise<boolean>
  readUserByEmail(email: string): Promise<User | null>
}