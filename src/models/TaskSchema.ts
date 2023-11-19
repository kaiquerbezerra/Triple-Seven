import { object, string } from "yup"

export default object({
  name: string().required().trim().max(20),
  description: string().optional().trim().max(255),
  color: string().optional().trim().oneOf([
    "Grey",
    "Red",
    "Blue",
    "Yellow"
  ])
})