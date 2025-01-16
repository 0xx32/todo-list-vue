<script setup lang="ts">
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import { Pencil, ShieldCheck, SquareCheckBig, Trash2 } from 'lucide-vue-next'
import { ref } from 'vue'
import { useTodos } from '../hooks/useTodos'

interface Props {
	id: number
	title: string
	isCompleted: boolean
	index: number
}
const props = defineProps<Props>()
const emit = defineEmits(['removeTask', 'changeIsCompleted'])

const isHovered = ref(false)

const { editTodoMutation } = useTodos()

const editTaskSubmitHandler = (event: Event) => {
	const formData = new FormData(event.target as HTMLFormElement)
	const title = formData.get('title') as string

	editTodoMutation.mutate({
		id: props.id,
		title,
	})
}
</script>

<template>
	<div
		@mouseenter="isHovered = true"
		@mouseleave="isHovered = false"
		class="flex gap-2 mb-4 pb-2 border-b"
		:class="{ 'border-green-500': isCompleted }"
	>
		<span>
			<ShieldCheck
				:class="{ 'text-gray-500': !isCompleted, 'text-green-500': isCompleted }"
			/>
		</span>
		<div class="text-gray-500">{{ index + 1 }}</div>

		<div class="ml-2">
			<div class="text-white">{{ title }}</div>
		</div>
		<div class="ml-auto flex gap-5 items-center">
			<button @click="emit('changeIsCompleted', id)">
				<SquareCheckBig class="text-gray-500 hover:text-gray-300" />
			</button>
			<Popover>
				<PopoverTrigger>
					<Pencil class="text-gray-500 hover:text-gray-300" />
				</PopoverTrigger>
				<PopoverContent>
					<form @submit.prevent="editTaskSubmitHandler">
						<div class="text-gray-500 mb-3">Редактировать</div>
						<Input placeholder="Введите текст" class="mb-5" name="title" />
						<Button type="submit">Подтвердить</Button>
					</form>
				</PopoverContent>
			</Popover>

			<button @click="emit('removeTask', id)">
				<Trash2 class="text-gray-500 hover:text-red-500" />
			</button>
		</div>
	</div>
</template>
