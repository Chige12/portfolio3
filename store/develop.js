import firebase from '~/plugins/firebase'
const db = firebase.firestore()
const strageRef = firebase.storage().ref()

export const state = () => ({
  works: [],
  user: null,
  alertTextArr: [],
  alertCounter: 0
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setAlertText(state, text) {
    const obj = {}
    obj.text = text
    obj.key = state.alertCounter
    state.alertTextArr.push(obj)
    state.alertCounter++
  },
  deleteAlertText(state) {
    state.alertTextArr.shift()
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
  },
  changeWork(state, work) {
    const i = state.works.findIndex((v) => v.hash === work.hash)
    if (state.works[i]) {
      for (const k of Object.keys(work)) {
        state.works[i][k] = work[k]
      }
    }
  },
  addWork(state, work) {
    state.works.push(work)
  },
  workIdChange(state, idHash) {
    const i = state.works.findIndex((v) => v.hash === idHash.hash)
    if (state.works[i]) {
      state.works[i].id = idHash.id
    }
  },
  setUpladImageText(state, image) {
    const i = state.works.findIndex((v) => v.hash === image.hash)
    if (state.works[i]) {
      state.works[i].image = image.name
    }
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
      .catch(() => {})
  },
  login({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        const resultUser = result.user
        const user = Object.keys(resultUser).reduce(
          (acc, key) =>
            ({}.hasOwnProperty.call(acc, key)
              ? { ...acc, [key]: resultUser[key] }
              : acc),
          { uid: null, displayName: null, photoURL: null, email: null }
        )
        if (user.uid === process.env.FB_OWNER_UID) {
          commit('setAlertText', 'ログイン成功!')
          commit('setUser', user)
        } else {
          commit('setAlertText', 'オーナーではありません')
        }
      })
      .catch(function(error) {
        const errorCode = error.code
        commit('setAlertText', `ログインエラー: ${errorCode}`)
      })
  },
  addWork({ commit }, work) {
    db.collection('works')
      .doc(work.hash)
      .set({
        id: work.id,
        title: work.title,
        lead: work.lead,
        image: work.image
      })
      .then(function() {
        commit('addWork', work)
        commit('setAlertText', '更新完了')
      })
      .catch(function(error) {
        commit('setAlertText', `更新できませんでした: ${error}`)
      })
  },
  setWork({ commit }, work) {
    db.collection('works')
      .doc(work.hash)
      .set({
        id: work.id,
        title: work.title,
        lead: work.lead,
        image: work.image
      })
      .then(function() {
        commit('changeWork', work)
        commit('setAlertText', '更新完了')
      })
      .catch(function(error) {
        commit('setAlertText', `更新できませんでした: ${error}`)
      })
  },
  workIdReplace({ commit }, twoWorks) {
    const twoWorksNew = [...twoWorks]
    let work1Id = 0
    let work2Id = 0
    if (twoWorksNew[1].id > twoWorksNew[0].id) {
      work1Id = twoWorksNew[0].id + 1
      work2Id = twoWorksNew[1].id - 1
    } else {
      work1Id = twoWorksNew[0].id - 1
      work2Id = twoWorksNew[1].id + 1
    }
    commit('workIdChange', { id: work1Id, hash: twoWorks[0].hash })
    commit('workIdChange', { id: work2Id, hash: twoWorks[1].hash })
    let isFirstUpdateSuccessed = false
    db.collection('works')
      .doc(twoWorks[0].hash)
      .update({
        id: work1Id
      })
      .then(function() {
        if (isFirstUpdateSuccessed) {
          commit('setAlertText', '更新完了')
          isFirstUpdateSuccessed = false
        }
        isFirstUpdateSuccessed = true
      })
      .catch(function() {
        commit('workIdChange', { id: twoWorks[0].id, hash: twoWorks[0].hash })
        commit('setAlertText', `更新できませんでした id: ${twoWorks[0].id}`)
      })
    db.collection('works')
      .doc(twoWorks[1].hash)
      .update({
        id: work2Id
      })
      .then(function() {
        if (isFirstUpdateSuccessed) {
          commit('setAlertText', '更新完了')
          isFirstUpdateSuccessed = false
        }
        isFirstUpdateSuccessed = true
      })
      .catch(function() {
        commit('workIdChange', { id: twoWorks[1].id, hash: twoWorks[1].hash })
        commit('setAlertText', `更新できませんでした id: ${twoWorks[1].id}`)
      })
  },
  uploadImage({ commit }, image) {
    const uploadTask = strageRef.child(`images/works/${image.name}`)
    uploadTask
      .put(image.file)
      .then(function(snapshot) {
        console.log('Uploaded a base64 string!')
        uploadTask.getDownloadURL().then(function(url) {
          db.collection('works')
            .doc(image.hash)
            .update({
              image: url
            })
            .then(function() {
              const newImage = { ...image }
              newImage.image = url
              commit('setAlertText', '更新完了')
              commit('setUpladImageText', newImage)
            })
            .catch(function() {
              commit('setAlertText', `更新できませんでした`)
            })
        })
      })
      .catch(function() {
        commit('setAlertText', `画像アップロード失敗`)
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
  }
}
