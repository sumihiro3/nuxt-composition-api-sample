<template>
  <section>
    <h4>{{ title }}</h4>
    <v-row v-for="todo in toDoList" :key="todo.id" align="center" dense>
      <v-checkbox
        v-model="todo.completed"
        :label="todo.title"
        color="red"
        disabled
      />
      <v-btn class="ml-4" x-small @click="toggleToDo(todo, !todo.completed)">
        Change status
      </v-btn>
    </v-row>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ToDo } from '@/types'
import { PropType } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    toDoList: {
      type: Array as PropType<ToDo[]>,
      required: true,
    },
    toggleToDo: {
      type: Function,
      required: true,
    },
  },
})
</script>
