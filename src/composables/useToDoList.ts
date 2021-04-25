import { ref } from '@nuxtjs/composition-api'
import { ToDo } from '~/types'

export default function useToDoList() {
  // ToDo List
  const toDoListRef = ref<ToDo[]>([])
  // new ToDo title
  const toDoTitleRef = ref<string>('')
  // Change ToDo status
  const changeToDoStatus = (toDo: ToDo, status: boolean) => {
    const index = toDoListRef.value.indexOf(toDo)
    toDoListRef.value.splice(index, 1, { ...toDo, completed: status })
  }
  // Add new ToDo
  const addToDo = () => {
    if (!toDoTitleRef.value || toDoTitleRef.value.length < 1) {
      return
    }
    const id = Math.floor(new Date().getTime() / 1000)
    const t: ToDo = {
      id,
      title: toDoTitleRef.value,
      completed: false,
      userId: 10,
    }
    toDoListRef.value.push(t)
    toDoTitleRef.value = ''
  }
  return {
    toDoListRef,
    toDoTitleRef,
    changeToDoStatus,
    addToDo,
  }
}
