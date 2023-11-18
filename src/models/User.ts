import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import sequelize from "../utils/sequelizeConnection"


export enum Roles {
  MASTER = "Master",
  DEV = "Developer",
}


class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>
  declare name: string
  declare email: string
  declare phone: string
  declare password: string
  declare birthday: Date
}

User.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  birthday: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: "User",
  tableName: "users"
})


export default User