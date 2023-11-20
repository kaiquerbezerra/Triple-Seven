import { number, object, string } from "yup"

export default object({
  name: string().required().trim().max(10),
  boardId: number().required()
})