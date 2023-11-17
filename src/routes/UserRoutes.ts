import UserController from "../controllers/UserController"
import UserRepository from "../repositories/UserRepository"
import UserService from "../services/UserService"
//import TaskController from "../controllers/TaskController"
//import TaskRepository from "../repositories/TaskRepository"
//import TaskService from "../services/TaskService"
//import SprintController from "../controllers/SprintController"
//import SprintRepository from "../repositories/SprintRepository"
//import SprintService from "../services/SprintService"
import authMiddleware from "../middlewares/Auth"
import { Router } from "express"


const router = Router();

const userRepository: UserRepository = new UserRepository()
const userService: UserService = new UserService(userRepository)
const userController: UserController = new UserController(userService)

//const taskRepository: TaskRepository = new TaskRepository()
//const taskService: TaskService = new TaskService(taskRepository)
//const taskController: TaskController = new TaskController(taskService)

//const sprintRepository: SprintRepository = new SprintRepository()
//const sprintService: SprintService = new SprintService(sprintRepository)
//const sprintController: SprintController = new SprintController(sprintService)

router.post('/login', (req, res) => userController.login(req, res))
router.post('/', (req, res) => userController.postUser(req, res))

//router.put('/:id', (req, res) => userController.patchUser(req, res))
//router.delete('/id', (req, res) => userController.deleteUser(req, res))

router.use(authMiddleware)

//router.post('/', (req, res) => taskController.postTask(req, res))
//router.put('/:id', (req, res) => taskController.patchTask(req, res))
//router.delete('/id', (req, res) => taskController.deleteTask(req, res))

//router.post('/', (req, res) => taskController.postTask(req, res))
//router.put('/:id', (req, res) => taskController.patchTask(req, res))
//router.delete('/id', (req, res) => taskController.deleteTask(req, res))

export default router