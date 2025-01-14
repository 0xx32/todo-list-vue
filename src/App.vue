<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TodoItem from './components/TodoItem.vue'

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

onMounted(() => {
	const tasksArr = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[]
	tasks.value = tasksArr
})
</script>

<template>
	<div class="bg-slate-900 h-screen">
		<div class="w-1/2 border-white/30 mx-auto pt-40">
			<form @submit="addTask" @submit.prevent>
				<div class="mb-4">
					<input
						type="text"
						class="border border-white/50 p-2 w-full bg-transparent rounded-md text-white"
						v-model="taskInput"
					/>
				</div>
			</form>

			<div>
				<TodoItem v-for="task in tasks" :id="task.id" :title="task.title" :isCompleted="task.isCompleted" />
			</div>
		</div>
	</div>
</template>
