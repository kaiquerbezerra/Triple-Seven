import UserController from "../controllers/UserController"
import UserRepository from "../repositories/UserRepository"
import UserService from "../services/UserService"
import authMiddleware from "../middlewares/Auth"
import { Router } from "express"


const router = Router();

const userRepository: UserRepository = new UserRepository()
const userService: UserService = new UserService(userRepository)
const userController: UserController = new UserController(userService)



router.post('/login', userController.login)
router.post('/', userController.postUser as any)
router.use(authMiddleware as any)

export default router