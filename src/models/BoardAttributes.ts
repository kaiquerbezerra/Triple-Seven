import boardSchema from "./BoardSchema"
import {InferType} from "yup"

export type BoardAttributes = InferType<typeof boardSchema>