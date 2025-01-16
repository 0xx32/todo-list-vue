import { api } from '@/utils/api/instance'

const RESOURCE = 'tasks'

export type NewTask = Omit<Task, 'id'>
export const getTodos = async () => api.get<Task[]>(RESOURCE)

export const addTodo = async (newTodo: NewTask) =>
	api.post(RESOURCE, {
		...newTodo,
	})

export const removeTodo = async (id: number) => api.delete(`${RESOURCE}/${id}`)

export const changeIsCompleted = async (id: number, isCompleted: boolean) =>
	api.patch(`${RESOURCE}/${id}`, {
		isCompleted,
	})
export const clearTodos = async () => api.patch(RESOURCE, [])

export const editTodo = async (id: number, title: string) =>
	api.patch(`${RESOURCE}/${id}`, {
		title,
	})
