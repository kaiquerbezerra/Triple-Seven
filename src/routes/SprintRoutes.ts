import SprintController from "../controllers/SprintController"
import SprintRepository from "../repositories/SprintRepository"
import SprintService from "../services/SprintService"
import authMiddleware from "../middlewares/Auth"
import { Router } from "express"

const router = Router();

const sprintRepository: SprintRepository = new SprintRepository()
const sprintService: SprintService = new SprintService(sprintRepository)
const sprintController: SprintController = new SprintController(sprintService)

router.use(authMiddleware)

router.post('/', (req, res) => sprintController.postSprint(req, res))
router.get('/', (req, res) => sprintController.getAllSprints(req, res))
router.put('/:id', (req, res) => sprintController.patchSprint(req, res))
router.delete('/id', (req, res) => sprintController.deleteSprint(req, res))

export default router