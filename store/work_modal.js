export const state = () => ({
  isWorksDetailShowed: false
})

export const mutations = {
  showWorksDetail(state) {
    state.isWorksDetailShowed = true
  },
  hideWorksDetail(state) {
    state.isWorksDetailShowed = false
  }
}
