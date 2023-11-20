export class Page {
  number: number
  size: number
  content?: any
  registersCount?: number

  constructor(query: any){

      this.number = parseInt( query.number as string ) || 1
      this.size = parseInt( query.size as string ) || 10
      this.content = {}
      this.registersCount = 0
  }

  get offset(): number {
      return (this.number - 1) * this.size
  }
  
}