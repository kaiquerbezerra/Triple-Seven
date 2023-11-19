import { Sequelize } from 'sequelize'
require('dotenv').config()

const sequelize = new Sequelize(process.env.MYSQL_DATABASE!, process.env.MYSQL_ROOT_USER!, process.env.MYSQL_ROOT_PASSWORD!, {
  host: 'mysql',
  dialect: 'mysql'
})

sequelize.authenticate().then(function(){
  console.log("DB Connected")
}).catch(function(error){
  console.log("Connection failed! " + error)
})

export default sequelize