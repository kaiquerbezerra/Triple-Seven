import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import sequelize from "../utils/sequelizeConnection"
import Sprint from './Sprint'
import UserBoard from "./UserBoard"
import User from "./User"

class Board extends Model<InferAttributes<Board>, InferCreationAttributes<Board>> {
  declare id: CreationOptional<number>
  declare name: string
  declare UserBoard?: (typeof UserBoard)[]
}

Board.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: "Board",
  tableName: "boards"
})

User.belongsToMany(Board, { through: UserBoard })
Board.belongsToMany(User, { through: UserBoard })

Board.hasMany(Sprint, { foreignKey: 'boardId' as 'sprints'})
Sprint.belongsTo(Board, { foreignKey: "boardId", as: "boards" })

export default Board