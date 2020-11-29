import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import UserModule from '~/store/user'
import MemoModule from '~/store/memo'

let userStore: UserModule
let memoStore: MemoModule

function initialiseStores(store: Store<any>): void {
  userStore = getModule(UserModule, store)
  memoStore = getModule(MemoModule, store)
}

export { initialiseStores, userStore, memoStore }
