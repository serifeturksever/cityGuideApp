/* eslint-disable no-undef */
import Card from '../src/components/Card.vue'
import { mount } from '@vue/test-utils'
import Vue from 'vue'

describe('Card.vue', () => {
  const wrapper = mount(Card)

  describe('should setup jest', () => {
    test('should setup properly', () => {
      expect(true).toBe(true)
    })
    test('should render Navbar', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('should render properly with props', () => {
    test('should set prop and render', async () => {
      const titleProp = 'Test Title'
      wrapper.setProps({
        title: titleProp
      })

      await Vue.nextTick()

      expect(wrapper.text()).toContain(titleProp)
    })
  })
})
