import { CreationAttributes } from "sequelize"
import ITaskRepository from "./ITaskRepository"
import Task from "../models/Task"
import { Page } from "../models/Page";
import { TaskAttributes } from "../models/TaskAttributes";

export default class TaskRepository implements ITaskRepository {
    async createTask(newTask: CreationAttributes<Task>): Promise<boolean> {
		let createdTask = await Task.create(newTask);
		return !!createdTask;
	}

	async findAllTasks(page: Page): Promise<Page> {
		const { count, rows } = await Task.findAndCountAll({
			attributes: ['id', 'name', 'description', 'color', 'finished', 'userId', 'sprintId'],
			offset: page.offset,
			limit: page.size,
		})
		page.content = rows
		page.registersCount = count
		return page;
	}

  async findTask(taskId: number): Promise<Task | null> {
    return await Task.findByPk(taskId)
  }

  async removeTask(taskId: number): Promise<boolean> {
    try {
      let deletedTaskRows = await Task.destroy({ where: { id: taskId } })
      return deletedTaskRows > 0
  } catch (error) {
      throw new Error("Erro ao deletar a task")
  }
  }
  async editTask(taskId: number, changes: TaskAttributes): Promise<boolean> {
    console.log(changes)
    let affectedCount = await Task.update(changes, {
      where: { 
        id: taskId 
      }
    })
    console.log(affectedCount[0])
    return affectedCount[0] > 0
  }
  async verifyTaskOwnerPermission(taskId: number, userId: number): Promise<boolean>  {
    let taskUser = await Task.findByPk(taskId, {
      attributes: ['userId']
    })
    if (taskUser?.userId !== userId) {
      return false
    } 
    return true
  }
}