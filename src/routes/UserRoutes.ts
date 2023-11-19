import UserController from "../controllers/UserController"
import UserRepository from "../repositories/UserRepository"
import UserService from "../services/UserService"
//import SprintController from "../controllers/SprintController"
//import SprintRepository from "../repositories/SprintRepository"
//import SprintService from "../services/SprintService"
import authMiddleware from "../middlewares/Auth"
import { Router } from "express"


const router = Router();

const userRepository: UserRepository = new UserRepository()
const userService: UserService = new UserService(userRepository)
const userController: UserController = new UserController(userService)

//const sprintRepository: SprintRepository = new SprintRepository()
//const sprintService: SprintService = new SprintService(sprintRepository)
//const sprintController: SprintController = new SprintController(sprintService)

router.post('/login', (req, res) => userController.login(req, res))
router.post('/', (req, res) => userController.postUser(req, res))

//router.put('/:id', (req, res) => userController.patchUser(req, res))
//router.delete('/id', (req, res) => userController.deleteUser(req, res))

router.use(authMiddleware)



export default router