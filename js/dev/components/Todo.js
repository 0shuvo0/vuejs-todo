export var Todo = Vue.component('Todo', {
	data(){
		return {
			editing: false
		}
	},
	props: ['todo'],
	mounted: function(){
		
	},
	template: `
<div>
	<div class="todo my-2" v-if="!editing">
		<p><input type="checkbox" class="mr-1" v-model="todo.completed"><span :class="{ done: todo.completed }" @click="editing = true">{{ todo.title }}</span></p>
		<i @click="$store.dispatch('deleteTodo', todo.index)">&times;</i>
	</div>
	<input type="text" class="input my-2" v-model="todo.title" placeholder="Enter todo" @keyup.enter="editing = false" v-else>
</div>
	`
});