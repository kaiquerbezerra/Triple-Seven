import userSchema from "./UserSchema"
import {InferType} from "yup"

export type UserAttributes = InferType<typeof userSchema>