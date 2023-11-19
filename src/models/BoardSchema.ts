import { object, string } from "yup"

export default object({
  name: string().required().trim().max(15),
})