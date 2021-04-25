<script lang="ts">
import { mount } from '@vue/test-utils'
import ToDoForm from '@/pages/ToDoForm.vue'

describe('ToDoForm', (): void => {
  test('is a Vue instance', (): void => {
    const wrapper = mount(ToDoForm)
    expect(wrapper.vm).toBeTruthy()
  })
})
</script>
