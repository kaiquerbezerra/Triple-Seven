import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize"
import sequelize from "../utils/sequelizeConnection"
import User from "./User"
import Sprint from "./Sprint"

class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare id: CreationOptional<number>
  declare name: string
  declare description: CreationOptional<string>
  declare color: CreationOptional<string>
  declare finished: CreationOptional<boolean>
  declare assignee?: NonAttribute<User>;
  declare sprintId: number
  declare userId: number
}

Task.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING
  },
  color: {
    allowNull: false,
    type: DataTypes.STRING
  },
  finished: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  sprintId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  modelName: "Task",
  tableName: "tasks"
})

export default Task