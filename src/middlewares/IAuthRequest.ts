import { JwtPayload } from "jsonwebtoken"

export interface IUserData extends JwtPayload {
  id: number,
  email: string,
  role: string,
}

interface AuthReq extends Request {
  userData?: IUserData
}

export type IAuthRequest = AuthReq & {
  headers: { authorization: string }
}