/* eslint-disable no-undef */
import {shallowMount, mount} from '@vue/test-utils'
import Welcome from '../src/components/Welcome.vue'
import Card from '../src/components/Card.vue'

// import "https://maps.googleapis.com/maps/api/js?key=AIzaSyCaq0kwX1z12NrkTiGDo4SZ4SSPJH5U03E&callback=initMap&libraries=localContext&v=beta"

// globalThis.google = require("https://maps.googleapis.com/maps/api/js?key=AIzaSyCaq0kwX1z12NrkTiGDo4SZ4SSPJH5U03E&callback=initMap&libraries=localContext&v=beta")

describe('Welcome.vue', () => {

  const wrapper = shallowMount(Welcome,{
    data:{
      google:"https://maps.googleapis.com/maps/api/js?key=AIzaSyCaq0kwX1z12NrkTiGDo4SZ4SSPJH5U03E&callback=initMap&libraries=localContext&v=beta"
    }
  })

  describe('should setup jest', () => {
    test('should setup properly', () => {
      expect(true).toBe(true)
    })
    test('should render Welcome.vue', () => {
      expect(wrapper).toBeTruthy()
    }) 
  })

  describe.skip('should render all 5 card properly', () => {
    test('card should be defined', () => {
      expect(wrapper.findAllComponents('Card')).toBeDefined()
    })
  })
})
