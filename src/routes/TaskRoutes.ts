import TaskController from "../controllers/TaskController"
import TaskRepository from "../repositories/TaskRepository"
import TaskService from "../services/TaskService"
import authMiddleware from "../middlewares/Auth"
import { Router } from "express"

const router = Router();

const taskRepository: TaskRepository = new TaskRepository()
const taskService: TaskService = new TaskService(taskRepository)
const taskController: TaskController = new TaskController(taskService)


router.use(authMiddleware)

router.post('/', (req, res) => taskController.postTask(req, res))
router.get('/', (req, res) => taskController.getAllTasks(req, res))
router.get('/:id', (req, res) => taskController.getTask(req, res))
router.put('/:id', (req, res) => taskController.patchTask(req, res))
router.delete('/id', (req, res) => taskController.deleteTask(req, res))

export default router