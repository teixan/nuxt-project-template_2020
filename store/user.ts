import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import firebase from '@/plugins/firebase'

export interface UserState {
  uid: string | null
  userName: string | null
}

@Module({ stateFactory: true, namespaced: true, name: 'user' })
export default class UserModule extends VuexModule implements UserState {
  userName: string | null = null
  uid: string | null = null

  get isLogin(): boolean {
    return this.uid != null
  }

  @Mutation
  setUser(user: firebase.User | null) {
    if (user != null) {
      this.uid = user.uid
      this.userName = user.displayName
    } else {
      this.uid = null
      this.userName = null
    }
  }

  @Action
  login() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const userResult = result.user
        this.setUser(userResult)
      })
  }

  @Action
  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setUser(null)
      })
      .catch(() => {
        // error
      })
  }
}
