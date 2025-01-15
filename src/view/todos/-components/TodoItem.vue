<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { SquareCheckBig, Trash2 } from 'lucide-vue-next'
interface Props {
	id: number
	title: string
	isCompleted: boolean
	index: number
}
defineProps<Props>()
const emit = defineEmits(['removeTask', 'changeIsCompleted'])

const isHovered = ref(false)
</script>

<template>
	<div
		class="flex items-center gap-2 mb-4 pb-2 border-b border-white/30 h-10"
		@mouseenter="isHovered = true"
		@mouseleave="isHovered = false"
	>
		<div class="text-gray-500">{{ index + 1 }}</div>

		<div class="text-white">{{ title }}</div>
		<div class="text-gray-500">id {{ id }}</div>
		<div class="ml-auto flex gap-5 items-center">
			<div class="text-green-500">
				<button @click="emit('changeIsCompleted', id)">
					<SquareCheckBig :class="{ 'text-gray-500': !isCompleted }" />
				</button>
			</div>
			<Button
				:class="{
					'opacity-0': !isHovered,
					invisible: !isHovered,
				}"
				variant="destructive"
				@click="emit('removeTask', id)"
			>
				<Trash2 />
			</Button>
		</div>
	</div>
</template>
