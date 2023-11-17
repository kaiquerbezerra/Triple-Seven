export class UserValidationError extends Error {

  constructor(path: string, value?: any){
    super(`Campo ${path} inválido`)
    this.name = 'UserValidationError'
  }
}