import { useMutation, useQuery } from '@tanstack/vue-query'
import { editTodo } from './../../../utils/api/requests/tasks/index'

import { addTodo, changeIsCompleted, clearTodos, getTodos, removeTodo } from '@/utils/api/requests/'
import { toast } from 'vue-sonner'

export const useTodos = () => {
	const todosQuery = useQuery({
		queryKey: ['todos'],
		queryFn: getTodos,
		select: (data) => data.data,
	})

	const addTodoMutation = useMutation({
		mutationFn: (title: string) => addTodo({ title, isCompleted: false }),
		onSuccess: () => todosQuery.refetch(),
	})
	const removeTodoMutation = useMutation({
		mutationFn: (id: number) => removeTodo(id),
		onSuccess(_, payload) {
			todosQuery.refetch()
			toast(`Уведомление`, {
				description: `Задача с id ${payload} удалена`,
			})
		},
	})

	const clearTodosMutation = useMutation({
		mutationFn: clearTodos,
		onSuccess: () => todosQuery.refetch(),
	})

	const changeIsCompletedMutation = useMutation({
		mutationFn: ({ id, status }: { id: number; status: boolean }) =>
			changeIsCompleted(id, status),
		onSuccess: () => todosQuery.refetch(),
	})

	const editTodoMutation = useMutation({
		mutationFn: ({ id, title }: { id: number; title: string }) => editTodo(id, title),
		onSuccess: () => todosQuery.refetch(),
	})
	return {
		todosQuery,
		addTodoMutation,
		removeTodoMutation,
		changeIsCompletedMutation,
		clearTodosMutation,
		editTodoMutation,
	}
}
