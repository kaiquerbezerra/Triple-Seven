import { DataTypes, Model } from 'sequelize'
import sequelize from '../utils/sequelizeConnection'
import { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

class UserBoard extends Model<InferAttributes<UserBoard>, InferCreationAttributes<UserBoard>> { 
  declare userId: CreationOptional<number>
  declare boardId: CreationOptional<number>
  declare isAdmin: CreationOptional<boolean>
}

UserBoard.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    boardId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'UserBoard',
    tableName: 'user_boards',
  }
)

export default UserBoard







//export default sequelize.define('UserBoard', {
//  isAdmin: {
//      type: DataTypes.BOOLEAN,
//      defaultValue: false
//  }
//}, {
//  tableName: 'user_boards'
//})
