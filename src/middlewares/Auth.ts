import { IAuthRequest, IUserData } from './IAuthRequest'
import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

function authMiddleware(req: IAuthRequest, res:Response, next: NextFunction) {
  try {
    let [, token] = req.headers.authorization!.split(" ")
    let jwtSecret = process.env.JWT_SECRET as string
    let { id, email, role } = jwt.verify(token, jwtSecret) as IUserData
    console.log(role)
    req.userData = { id, email, role }
    next()
} catch (error) {
    res.status(401).json({
      message: 'Não autorizado'
    })
  }
}

export default authMiddleware