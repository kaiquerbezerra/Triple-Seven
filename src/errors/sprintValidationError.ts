export class SprintValidationError extends Error {
  constructor(path: string, value?: any){
    super(`Campo ${path} inválido`)
    this.name = 'SprintValidationError'
  }
}