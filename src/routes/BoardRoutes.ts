import BoardController from "../controllers/BoardController"
import BoardRepository from "../repositories/BoardRepository"
import BoardService from "../services/BoardService"
import authMiddleware from "../middlewares/Auth"
import { Router } from "express"

const router = Router();

const boardRepository: BoardRepository = new BoardRepository()
const boardService: BoardService = new BoardService(boardRepository)
const boardController: BoardController = new BoardController(boardService)

router.use(authMiddleware)

router.post('/', (req, res) => boardController.postBoard(req, res))
router.get('/', (req, res) => boardController.getAllBoards(req, res))
router.put('/:id', (req, res) => boardController.patchBoard(req, res))
router.delete('/id', (req, res) => boardController.deleteBoard(req, res))

export default router