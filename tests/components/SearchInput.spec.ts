import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchInput from '../../src/components/ui/SearchInput.vue'

const route = { query: {} as Record<string, string> }

vi.mock('vue-router', () => ({
  useRoute: () => route
}))

describe('SearchInput', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    route.query = {}
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('emits the query only after the 300ms debounce', async () => {
    const wrapper = mount(SearchInput)

    await wrapper.find('input').setValue('break')
    vi.advanceTimersByTime(299)
    expect(wrapper.emitted('search')).toBeUndefined()

    vi.advanceTimersByTime(1)
    expect(wrapper.emitted('search')).toEqual([['break']])
  })

  it('emits only the last value when typing quickly', async () => {
    const wrapper = mount(SearchInput)
    const input = wrapper.find('input')

    await input.setValue('b')
    vi.advanceTimersByTime(100)
    await input.setValue('breaking')
    vi.advanceTimersByTime(300)

    expect(wrapper.emitted('search')).toEqual([['breaking']])
  })

  it('restores the query from the URL and searches once on mount', async () => {
    route.query = { q: 'office' }
    const wrapper = mount(SearchInput)
    await wrapper.vm.$nextTick()
    vi.advanceTimersByTime(300)

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('office')
    expect(wrapper.emitted('search')).toEqual([['office']])
  })

  it('clears the input with the clear button and emits an empty search', async () => {
    const wrapper = mount(SearchInput)
    await wrapper.find('input').setValue('break')
    vi.advanceTimersByTime(300)

    await wrapper.find('.clear-btn').trigger('click')
    vi.advanceTimersByTime(300)

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('')
    expect(wrapper.find('.clear-btn').exists()).toBe(false)
  })
})
