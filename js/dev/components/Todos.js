import { Todo } from "./Todo.js"

export var Todos = Vue.component('Todos', {
	data(){
		return {
			filter: "allTodos"
		}
	},
	computed: {
		todos(){
			return this.$store.getters[this.filter]
		}
	},
	watch: {
		filter(){
			//alert(0)
		}
	},
	template: `
<div>
	<div>
		<Todo v-for="todo in todos" :key="todo.index" :todo="todo"></Todo>
	</div>
	<div class="footer" v-if="store.getters.allTodos.length > 0">
				<span>{{ $store.getters.leftTodosLen }} left</span>
				<div>
					<span @click="filter = 'allTodos'">all</span>
					<span @click="filter = 'getActiveTodos'">active</span>
					<span @click="filter = 'getCompletedTodos'">completed</span>
				</div>
				<spn @click="$store.dispatch('clearCompletedTodo')" v-if="$store.getters.hasCompleted">clear completed</span>
	</div>
</div>
	`
});