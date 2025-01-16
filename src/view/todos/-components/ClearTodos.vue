<script setup lang="ts">
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui'

const emit = defineEmits(['clearTodos'])
</script>

<template>
	<AlertDialog>
		<AlertDialogTrigger class="text-red-500"> Очистить лист</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Подтвердите действие</AlertDialogTitle>
				<AlertDialogDescription>
					Вы уверены что хотите очистить список?
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Отменить</AlertDialogCancel>
				<AlertDialogAction @click="emit('clearTodos')">Подтвердить</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
</template>
