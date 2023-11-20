import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize"
import sequelize from "../utils/sequelizeConnection"
import Board from "./Board"
import Task from "./Task";

class Sprint extends Model<InferAttributes<Sprint>, InferCreationAttributes<Sprint>> {
  declare id: CreationOptional<number>
  declare name: string
  declare boardId: number;
}

Sprint.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  }, 
  boardId: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  modelName: "Sprint",
  tableName: "sprints"
})

Sprint.hasMany(Task, { foreignKey: 'sprintId', as: 'tasks'})
Task.belongsTo(Sprint, { foreignKey: "sprintId", as: "sprints" })

export default Sprint