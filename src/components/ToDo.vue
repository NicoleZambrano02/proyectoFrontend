<template lang="html">
  <div class="container">
    <h1 style="align-self: center">LISTA DE TAREAS</h1>
    <form v-on:submit='addTodo($event)'>
      <input type='text' placeholder='Ingresar Tarea' v-model='newTodo'/>
      <input type='submit' />
    </form>
    <ul>
      <li v-for='todo in todos' :key='todo._id'>
        <button @click='deleteTodo(todo._id)' >Eliminar</button> {{todo.title}}
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

</style>
