<template>
  <v-container>
    <!-- Add ToDo -->
    <v-row>
      <v-col cols="4">
        <v-text-field v-model="toDoTitle" type="text" />
      </v-col>
      <v-col cols="2">
        <v-btn @click="addTodo">Add</v-btn>
      </v-col>
    </v-row>
    <!-- Search ToDo -->
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="searchText"
          placeholder="Filter Todos"
          type="text"
        />
      </v-col>
    </v-row>
    <!-- Show ToDos -->
    <v-row dense>
      <!-- Doing ToDos -->
      <v-col cols="6">
        <h4>DOING</h4>
        <v-row v-for="todo in doingToDos" :key="todo.id" align="center" dense>
          <v-checkbox
            v-model="todo.completed"
            :label="todo.title"
            color="red"
            disabled
          />
          <v-btn class="ml-4" x-small @click="changeToDoStatus(todo, true)"
            >Done!</v-btn
          >
        </v-row>
      </v-col>
      <!-- Completed ToDos -->
      <v-col cols="6">
        <h4>COMPLETED</h4>
        <v-row
          v-for="todo in completedToDos"
          :key="todo.id"
          align="center"
          dense
        >
          <v-checkbox
            v-model="todo.completed"
            :label="todo.title"
            color="red"
            disabled
          />
          <v-btn class="ml-4" x-small @click="changeToDoStatus(todo, false)"
            >Doing</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useAsync,
  useContext,
  computed,
} from 'nuxt-composition-api'

interface ToDo {
  id: number
  userId: number
  title: string
  completed: boolean
}

export default defineComponent({
  setup() {
    const toDoTitle = ref<string>('')
    const searchText = ref<string>('')
    const toDos = ref<ToDo[]>([])

    // Load todos
    useAsync(async () => {
      const { app } = useContext()
      const todoList = await app.$axios.$get<ToDo[]>(
        'https://jsonplaceholder.typicode.com/todos'
      )
      toDos.value = todoList.slice(0, 20)
    })

    // Filter todos by searchText
    const searchedToDos = computed(() => {
      return toDos.value.filter((t) => t.title.includes(searchText.value))
    })

    // Filter doing todos
    const doingToDos = computed(() => {
      return searchedToDos.value.filter((t) => t.completed === false)
    })

    // Filter completed todos
    const completedToDos = computed(() => {
      return searchedToDos.value.filter((t) => t.completed === true)
    })

    // Add new ToDo
    function addTodo() {
      const id = Math.floor(new Date().getTime() / 1000)
      const t: ToDo = {
        id,
        title: toDoTitle.value,
        completed: false,
        userId: 10,
      }
      toDos.value.push(t)
      toDoTitle.value = ''
    }

    // Change ToDo status
    function changeToDoStatus(toDo: ToDo, status: boolean) {
      toDo.completed = status
    }

    return {
      toDoTitle,
      searchText,
      toDos,
      searchedToDos,
      doingToDos,
      completedToDos,
      addTodo,
      changeToDoStatus,
    }
  },
})
</script>
