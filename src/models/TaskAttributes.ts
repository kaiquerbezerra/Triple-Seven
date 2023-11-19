import taskSchema from "./TaskSchema"
import {InferType} from "yup"

export type TaskAttributes = InferType<typeof taskSchema>