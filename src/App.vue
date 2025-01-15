<script setup lang="ts">
import { Toaster } from './components/ui/sonner'
import TodoView from './view/todos/todoView.vue'
</script>

<template>
	<div class="bg-slate-900 h-screen">
		<TodoView />
	</div>
	<Toaster position="top-right" />
</template>
