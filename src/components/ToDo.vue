<template lang="html">
  <div id="container">
    <h1 id="title">LISTA DE TAREAS</h1>
    <form v-on:submit='addTodo($event)'>
      <input id="list" type='text' placeholder='Ingresar Tarea' v-model='newTodo'/>
      <button id="button" type='submit'>ENVIAR</button>
    </form>
    <ul>
      <li id="tasks" v-for='todo in todos' :key='todo._id'>
        <button id="buttons" @click='deleteTodo(todo._id)' >ELIMINAR</button> {{todo.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import ToDoAPI from '@/services/ToDoAPI.js'
export default {
  data () {
    return {
      newTodo: '',
      todos: []
    }
  },
  mounted () {
    this.loadTodos()
  },
  methods: {
    async addTodo (evt) {
      evt.preventDefault() // prevents the form's default action from redirecting the page
      const response = await ToDoAPI.addTodo(this.newTodo)
      this.todos.push(response.data)
      this.newTodo = '' // clear the input field
    },
    async loadTodos () {
      const response = await ToDoAPI.getToDos()
      this.todos = response.data
    },
    deleteTodo (todoID) {
      ToDoAPI.deleteTodo(todoID)
      // remove the array element with the matching id
      this.todos = this.todos.filter(function (obj) {
        return obj._id !== todoID
      })
    }
  }
}
</script>
<style lang="css">
  #container {
    align-items: center;
  }
  #title {
    color: red;
  }
  #tasks {
    color: black;
  }
  #list {
    height: 25px;
    border-radius: 12px;
  }
  button {
    transition-duration: 0.4s;
    border-color: #4CAF50;
    background-color: white;
    border-radius: 12px;
    height: 30px;
    width: 100px;
  }
  button:hover {
    background-color: #4CAF50; /* Green */
    color: white;
  }

</style>
