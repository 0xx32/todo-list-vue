<script setup lang="ts">
interface Props {
	id: number
	title: string
	isCompleted: boolean
}
defineProps<Props>()
</script>

<template>
	<div class="flex items-center gap-2">
		<div class="text-gray-500">{{ id }}</div>
		<div class="text-white">{{ title }}</div>
		<div v-if="isCompleted" class="text-green-500">Completed</div>
		<div v-else class="text-red-500">Not completed</div>
	</div>
</template>
