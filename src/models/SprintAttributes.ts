import sprintSchema from "./SprintSchema"
import {InferType} from "yup"

export type SprintAttributes = InferType<typeof sprintSchema>