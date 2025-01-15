<script setup lang="ts">
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui'

const emit = defineEmits(['clearTodos'])
</script>

<template>
	<Dialog>
		<DialogTrigger>
			<Button class="ml-auto" variant="destructive"> Очистить лист </Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Подтвердите действие</DialogTitle>
				<DialogDescription> Вы уверены что хотите очистить список? </DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<DialogClose asChild>
					<Button variant="default" @click="emit('clearTodos')"> Подтвердить </Button>
				</DialogClose>
				<DialogClose asChild>
					<Button variant="destructive"> Отмена </Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
