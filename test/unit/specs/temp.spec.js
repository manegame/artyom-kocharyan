import Vue from 'vue'
import temp from 'src/components/temp'

describe('temp.vue', () => {
  // it('should render correct contents', () => {
  //   const vm = new Vue({
  //     el: document.createElement('div'),
  //     render: h => h(temp)
  //   })
  //   expect(vm.$el.querySelector('.temp__title').textContent).to.equal('Compilation 1')
  // })

  it('has a mounted hook', () => {
    expect(typeof temp.mounted).toBe('function')
  })
})
