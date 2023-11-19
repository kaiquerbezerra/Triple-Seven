export class BoardValidationError extends Error {
  constructor(path: string, value?: any){
    super(`Campo ${path} inválido`)
    this.name = 'BoardValidationError'
  }
}