<template>
  <v-container>
    <!-- Add ToDo -->
    <v-row>
      <v-col cols="4">
        <v-text-field v-model="todoTitleRef" type="text" />
      </v-col>
      <v-col cols="2">
        <v-btn @click="addToDo">Add</v-btn>
      </v-col>
    </v-row>
    <!-- Search ToDo -->
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="filterTitleTextRef"
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
// import { Ref } from '@vue/composition-api'
import {
  Ref,
  defineComponent,
  ref,
  useAsync,
  useContext,
  computed,
} from '@nuxtjs/composition-api'

interface ToDo {
  id: number
  userId: number
  title: string
  completed: boolean
}

const useToDoList = () => {
  // ToDo List
  const toDosRef = ref<ToDo[]>([])

  // Change ToDo status
  const changeToDoStatus = (toDo: ToDo, status: boolean) => {
    const index = toDosRef.value.indexOf(toDo)
    toDosRef.value.splice(index, 1, { ...toDo, completed: status })
  }

  return {
    toDosRef,
    changeToDoStatus,
  }
}

const useAddingToDo = (toDosRef: Ref<ToDo[]>) => {
  // new ToDo title
  const todoTitleRef = ref<string>('')

  // Add new ToDo
  const addToDo = () => {
    const id = Math.floor(new Date().getTime() / 1000)
    const t: ToDo = {
      id,
      title: todoTitleRef.value,
      completed: false,
      userId: 10,
    }
    toDosRef.value.push(t)
    todoTitleRef.value = ''
  }
  return {
    todoTitleRef,
    addToDo,
  }
}

const useToDoFilter = (toDosRef: Ref<ToDo[]>) => {
  // filter text
  const filterTitleTextRef = ref<string>('')

  // Filter todos by filter text
  const filteredToDos = computed(() => {
    return toDosRef.value.filter((t: ToDo) =>
      t.title.includes(filterTitleTextRef.value)
    )
  })

  // Filter doing todos
  const doingToDos = computed(() => {
    return filteredToDos.value.filter((t: ToDo) => t.completed === false)
  })

  // Filter completed todos
  const completedToDos = computed(() => {
    return filteredToDos.value.filter((t: ToDo) => t.completed === true)
  })

  return {
    filterTitleTextRef,
    filteredToDos,
    doingToDos,
    completedToDos,
  }
}

export default defineComponent({
  setup() {
    const { toDosRef, changeToDoStatus } = useToDoList()
    const { todoTitleRef, addToDo } = useAddingToDo(toDosRef)
    const {
      filterTitleTextRef,
      filteredToDos,
      doingToDos,
      completedToDos,
    } = useToDoFilter(toDosRef)

    // Load todos
    useAsync(async () => {
      const { app } = useContext()
      const todoList = await app.$axios.$get<ToDo[]>(
        'https://jsonplaceholder.typicode.com/todos'
      )
      toDosRef.value = todoList.slice(0, 20)
    })

    return {
      // Refs
      toDosRef,
      todoTitleRef,
      filterTitleTextRef,
      // Functions
      changeToDoStatus,
      addToDo,
      // Computed
      filteredToDos,
      doingToDos,
      completedToDos,
    }
  },
})
</script>
