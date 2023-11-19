export class TaskValidationError extends Error {
  constructor(path: string, value?: any){
    super(`Campo ${path} inválido`)
    this.name = 'TaskValidationError'
  }
}