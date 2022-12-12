import {render, screen} from '@testing-library/vue'
import Navbar from '../../src/components/Navbar.vue'

test('Navbar Test', async () => {
  render(Navbar)

  // should render 3 navbar link
  screen.debug(screen.getAllByRole('router-link'))
  console.log(screen.getAllByRole('router-link').length === 3)
})
