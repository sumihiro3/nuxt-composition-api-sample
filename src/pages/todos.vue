<template>
  <v-container>
    <!-- Add ToDo -->
    <v-row>
      <v-col cols="4">
        <v-text-field v-model="toDoTitleRef" type="text" />
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
        <to-do-list
          title="Doing"
          :to-do-list="doingToDoList"
          :toggle-to-do="changeToDoStatus"
        />
      </v-col>
      <!-- Completed ToDos -->
      <v-col cols="6">
        <to-do-list
          title="Completed"
          :to-do-list="completedToDoList"
          :toggle-to-do="changeToDoStatus"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { ToDo } from '@/types'
// Composable functions
import useToDoList from '@/composables/useToDoList'
import useToDoFilter from '@/composables/useToDoFilter'
// Components
import ToDoList from '@/components/ToDoList.vue'

export default defineComponent({
  components: {
    ToDoList,
  },
  setup() {
    const {
      toDoListRef,
      toDoTitleRef,
      changeToDoStatus,
      addToDo,
    } = useToDoList()
    const {
      filterTitleTextRef,
      doingToDoList,
      completedToDoList,
    } = useToDoFilter(toDoListRef)
    // Load todos
    useAsync(async () => {
      const { app } = useContext()
      const todoList = await app.$axios.$get<ToDo[]>(
        'https://jsonplaceholder.typicode.com/todos'
      )
      toDoListRef.value = todoList.slice(0, 20)
    })
    // Return values
    return {
      // Refs
      toDoListRef,
      toDoTitleRef,
      filterTitleTextRef,
      // Functions
      changeToDoStatus,
      addToDo,
      // Computed
      doingToDoList,
      completedToDoList,
    }
  },
})
</script>
