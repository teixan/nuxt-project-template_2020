import firebase from '@/plugins/firebase'
import { userStore } from '@/store'

export default () => {
  if (process.client) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userStore.setUser(user)
      }
    })
  }
  if (process.server) {
    // server process
  }
}
