import { Ref, ref, computed } from '@nuxtjs/composition-api'
import { ToDo } from '~/types'

export default function useToDoFilter(toDoListRef: Ref<ToDo[]>) {
  // filter text
  const filterTitleTextRef = ref<string>('')

  // Filter todo list by filter text
  const filteredToDoList = computed(() => {
    return toDoListRef.value.filter((t: ToDo) =>
      t.title.includes(filterTitleTextRef.value)
    )
  })

  // Filter doing todo list
  const doingToDoList = computed(() => {
    return filteredToDoList.value.filter((t: ToDo) => t.completed === false)
  })

  // Filter completed todo list
  const completedToDoList = computed(() => {
    return filteredToDoList.value.filter((t: ToDo) => t.completed === true)
  })

  return {
    filterTitleTextRef,
    doingToDoList,
    completedToDoList,
  }
}
