export const state = () => ({
  page: 'index',
  aboutPageTop: 0,
  indexScrollHeight: 0
})
export const mutations = {
  updatePage(state, page) {
    state.page = page
  },
  setAboutPageTop(state, top) {
    state.aboutPageTop = top
  },
  saveIndexScrollHeight(state, height) {
    state.indexScrollHeight = height
  }
}
