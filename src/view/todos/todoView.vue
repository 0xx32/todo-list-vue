<script setup lang="ts">
import { Plus, X } from 'lucide-vue-next'
import { ref } from 'vue'

import { Button, Input } from '@/components/ui'
import TodoItem from './-components/TodoItem.vue'
import ClearTodos from './-components/ClearTodos.vue'

import { useTodos } from './hooks/useTodos'

const taskInput = ref('')

const {
	todosQuery,
	addTodoMutation,
	removeTodoMutation,
	changeIsCompletedMutation,
	clearTodosMutation,
} = useTodos()

const addTask = () => {
	addTodoMutation.mutate(taskInput.value)
	taskInput.value = ''
}

const removeTask = (id: number) => {
	removeTodoMutation.mutate(id)
}
const changeIsCompleted = (id: number) => {
	changeIsCompletedMutation.mutate({
		id,
		status: !todosQuery.data.value?.find((t) => t.id === id)!.isCompleted!,
	})
}
</script>

<template>
	<div class="w-1/3 border-white/30 mx-auto pt-40">
		<div class="flex mb-6 justify-end">
			<ClearTodos @clear-todos="clearTodosMutation.mutate" />
		</div>
		<form @submit="addTask" @submit.prevent class="mb-6">
			<div class="mb-4 flex gap-4 items-center">
				<div class="relative w-full">
					<Input type="text" v-model="taskInput" placeholder="Введите задачу" />
					<button
						type="button"
						@click="taskInput = ''"
						class="absolute right-2 top-1/2 -translate-y-1/2"
					>
						<X class="text-gray-500" />
					</button>
				</div>

				<Button type="submit" class="ml-auto"><Plus /> Добавить</Button>
			</div>
		</form>
		<div class="mb-4">
			<div v-if="todosQuery.isFetching.value">Загрузка...</div>
			<div v-if="todosQuery.data.value?.length === 0" class="text-gray-500 text-center">
				Список пуст
			</div>
			<TodoItem
				v-else
				v-for="(todo, index) in todosQuery.data.value"
				@removeTask="removeTask"
				@changeIsCompleted="changeIsCompleted"
				:id="todo.id"
				:title="todo.title"
				:is-completed="todo.isCompleted"
				:index="index"
			/>
		</div>
	</div>
</template>
