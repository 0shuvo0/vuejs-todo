import { Todos } from "../components/Todos.js"

export var Homepage = Vue.component('home-page', {
	data(){
		return {
			todo: ""
		}
	},
	template: `
	<div>
		<h1>TODO APP</h1>
		<div class="container">
			<input class="input main" type="text" placeholder="Enter new todo" v-model="todo" @keyup.enter="$store.dispatch('addTodo', todo); todo = ''">
			<Todos></Todos>
		</div>
	</div>
	`
});