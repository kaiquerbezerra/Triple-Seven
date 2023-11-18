import { JwtPayload } from "jsonwebtoken"
import { Request } from "express"

export interface IUserData extends JwtPayload {
  id: number,
  email: string
}

export interface IAuthRequest extends Request {
  userData?: IUserData
}