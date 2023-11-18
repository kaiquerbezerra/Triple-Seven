import { IAuthRequest, IUserData } from './IAuthRequest'
import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

function authMiddleware(req: IAuthRequest, res:Response, next: NextFunction) {
  try {
    let [, token] = req.headers.authorization!.split(" ")
    let jwtSecret = process.env.JWT_SECRET as string
    let { id, email } = jwt.verify(token, jwtSecret) as IUserData
    req.userData = { id, email }
    next()
} catch (error) {
    res.status(401).json({
      message: 'Não autorizado'
    })
  }
}

export default authMiddleware