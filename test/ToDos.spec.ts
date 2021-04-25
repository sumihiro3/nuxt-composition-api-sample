import { mount } from '@vue/test-utils'
import ToDos from '@/pages/ToDos.vue'

describe('ToDos', (): void => {
  test('is a Vue instance', (): void => {
    const wrapper = mount(ToDos)
    expect(wrapper.vm).toBeTruthy()
  })
})
