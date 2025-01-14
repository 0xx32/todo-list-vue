<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { Input } from '@/components/ui/input'
import TodoItem from './components/TodoItem.vue'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-vue-next'

interface Task {
	id: number
	title: string
	isCompleted: boolean
}

const tasks = ref<Task[]>([])
const taskInput = ref('')

const addTask = () => {
	tasks.value.push({
		id: tasks.value.length + 1,
		title: taskInput.value,
		isCompleted: false,
	})
	taskInput.value = ''

	localStorage.setItem('tasks', JSON.stringify(tasks.value))
}
const clearTasks = () => {
	tasks.value = []
	localStorage.removeItem('tasks')
}
const removeTask = (id: number) => {
	tasks.value = tasks.value.filter((task) => task.id !== id)
	localStorage.setItem('tasks', JSON.stringify(tasks.value))
}
const changeIsCompleted = (id: number) => {
	tasks.value = tasks.value.map((task) => {
		if (task.id === id) {
			task.isCompleted = !task.isCompleted
		}
		return task
	})
	localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

onMounted(() => {
	const tasksArr = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[]
	tasks.value = tasksArr
})
</script>

<template>
	<div class="bg-slate-900 h-screen">
		<div class="w-1/3 border-white/30 mx-auto pt-40">
			<div class="flex mb-6">
				<Button class="ml-auto" variant="destructive" @click="clearTasks"> Очистить лист</Button>
			</div>
			<form @submit="addTask" @submit.prevent class="mb-6">
				<div class="mb-4 flex gap-4 items-center">
					<div class="relative w-full">
						<Input type="text" v-model="taskInput" placeholder="Введите задачу" />
						<button type="button" @click="taskInput = ''" class="absolute right-2 top-1/2 -translate-y-1/2">
							<X class="text-gray-500" />
						</button>
					</div>

					<Button type="submit" class="ml-auto"><Plus /> Добавить</Button>
				</div>
			</form>
			<div class="mb-4">
				<TodoItem
					v-for="(task, index) in tasks"
					@removeTask="removeTask"
					@changeIsCompleted="changeIsCompleted"
					:id="task.id"
					:title="task.title"
					:is-completed="task.isCompleted"
					:index="index"
				/>
			</div>
		</div>
	</div>
</template>
