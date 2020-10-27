import { Homepage } from "./pages/Homepage.js";

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
  			if(!todo.completed) i++
  			return todo
  		})
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
  		})
  	},
  	DELETE_TODO(state, index){
  		state.todos = state.todos.filter(function(todo){
  			return todo.index != index
  		})
  	},
  	CLEAR_COMPLETED_TODO(state){
  		state.todos = state.todos.filter(function(todo){
  			return !todo.completed
  		})
  	}
  },
  actions: {
  	addTodo(context, data){
  		context.commit('ADD_TODO', data)
  	},
  	deleteTodo(context, index){
  		context.commit('DELETE_TODO', index)
 	 },
 	clearCompletedTodo(context){
 		context.commit('CLEAR_COMPLETED_TODO')
 	}
  }
})

var app = new Vue({
	el: "#app",
	store: store
});