var Todo = Vue.component('Todo', {
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

var Todos = Vue.component('Todos', {
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

var Homepage = Vue.component('home-page', {
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

var store = new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
  	allTodos(state){
  		return state.todos
  	},
  	leftTodosLen(state){
  		var i = 0;
  		state.todos.map(function(todo){
  			if(!todo.completed) i++;
  			return todo
  		});
  		return i
  	},
  	hasCompleted(state){
  		for(var todo of state.todos){
  			if(todo.completed) return true
  		}
  		return false
  	},
  	getActiveTodos(state){
  		return state.todos.filter(function(todo){
  			return !todo.completed
  		})
  	},
  	getCompletedTodos(state){
  		return state.todos.filter(function(todo){
  			return todo.completed
  		})
  	}
  },
  mutations: {
  	ADD_TODO(state, data){
 		if(!data.trim()) return;
  		state.todos.unshift({
  			title: data,
  			completed: false,
  			index: state.todos.length
  		});
  	},
  	DELETE_TODO(state, index){
  		state.todos = state.todos.filter(function(todo){
  			return todo.index != index
  		});
  	},
  	CLEAR_COMPLETED_TODO(state){
  		state.todos = state.todos.filter(function(todo){
  			return !todo.completed
  		});
  	}
  },
  actions: {
  	addTodo(context, data){
  		context.commit('ADD_TODO', data);
  	},
  	deleteTodo(context, index){
  		context.commit('DELETE_TODO', index);
 	 },
 	clearCompletedTodo(context){
 		context.commit('CLEAR_COMPLETED_TODO');
 	}
  }
});

var app = new Vue({
	el: "#app",
	store: store
});
