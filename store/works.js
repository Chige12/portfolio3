import firebase from '~/plugins/firebase'
const db = firebase.firestore()

export const state = () => ({
  works: [],
  isWorkDetailsShowed: false,
  workDetailsId: 0,
  workDetailsBackPath: '/works'
})

export const mutations = {
  showWorkDetails(state, id) {
    state.isWorkDetailsShowed = true
    state.workDetailsId = id
  },
  hideWorkDetails(state) {
    state.isWorkDetailsShowed = false
  },
  setworkDetailsBackPath(state, path) {
    state.workDetailsBackPath = path
  },
  updateWork(state, works) {
    const newWorks = [...state.works, ...works]
    // 重複排除
    const uniqueWorks = newWorks.filter((v1, i1, a1) => {
      return (
        a1.findIndex((v2) => {
          return v1.hash === v2.hash
        }) === i1
      )
    })
    state.works = uniqueWorks
  }
}

export const actions = {
  fetchWorks({ commit }) {
    db.collection('works')
      .get()
      .then((res) => {
        const dataArray = []
        res.forEach((doc) => {
          const data = doc.data()
          data.hash = doc.id
          dataArray.push(data)
        })
        commit('updateWork', dataArray)
      })
      .catch((error) => {
        console.log('error fetch works data : ' + error)
      })
  }
}

export const getters = {
  getWorks(state) {
    const sortedIdWorks = [...state.works].sort(function(a, b) {
      if (a.id < b.id) return -1
      if (a.id > b.id) return 1
      return 0
    })
    return sortedIdWorks
  },
  getSmallWorks(state) {
    const sortedIdWorks = [...state.works].sort(function(a, b) {
      if (a.id < b.id) return -1
      if (a.id > b.id) return 1
      return 0
    })
    return sortedIdWorks.slice(0, 6)
  }
}
