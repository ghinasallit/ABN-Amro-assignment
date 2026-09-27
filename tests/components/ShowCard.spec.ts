import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import ShowCard from '../../src/components/ui/ShowCard.vue'
import type { Show } from '../../src/types/show'

const show: Show = {
  id: 169,
  name: 'Breaking Bad',
  genres: ['Drama'],
  image: { medium: 'bb-medium.jpg', original: 'bb.jpg' },
  rating: { average: 9.2 },
  summary: null
}

function mountCard(props: Show) {
  return mount(ShowCard, {
    props: { show: props },
    global: { stubs: { RouterLink: RouterLinkStub } }
  })
}

describe('ShowCard', () => {
  it('renders the show name, rating and poster', () => {
    const wrapper = mountCard(show)

    expect(wrapper.find('.show-name').text()).toBe('Breaking Bad')
    expect(wrapper.text()).toContain('9.2/10')
    expect(wrapper.find('img').attributes('src')).toBe('bb-medium.jpg')
    expect(wrapper.find('img').attributes('alt')).toBe('Breaking Bad')
  })

  it('links to the show details page', () => {
    const wrapper = mountCard(show)

    expect(wrapper.findComponent(RouterLinkStub).props('to')).toEqual({
      name: 'show',
      params: { id: 169 }
    })
  })

  it('falls back to a placeholder when the show has no image or rating', () => {
    const wrapper = mountCard({ ...show, image: null, rating: { average: null } })

    expect(wrapper.find('img').attributes('src')).toContain('placeholder-show')
    expect(wrapper.text()).toContain('—/10')
  })
})
