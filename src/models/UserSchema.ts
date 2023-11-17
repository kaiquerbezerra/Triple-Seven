import { date, object, string } from "yup"
const PHONE_REGEX = /^(\(\d{2}\))\s(9?\s?\d{4}-\d{4})$/g
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/g

export default object({
    name: string().required().trim(),
    email: string().required().trim(),
    birthday: date().required(),
    phone: string().required().matches(PHONE_REGEX).trim(),
    password: string().required().min(8).max(20).matches(PASSWORD_REGEX),
    role: string().required().trim().oneOf(["Master", "Developer"])
})