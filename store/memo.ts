import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { firebase, db } from '@/plugins/firebase'

const memoRef = db.collection('memos')
export interface MemoState {
  title: string | null
  body: string | null
  uid: string | null
  id: string | null
}

@Module({ stateFactory: true, namespaced: true, name: 'memo' })
export default class MemoModule extends VuexModule {
  memos: MemoState[] = []

  @Mutation
  pushMemo(memo: MemoState) {
    this.memos.push(memo)
  }

  @Mutation
  clearMemo() {
    this.memos = []
  }

  @Action
  addMemo(memo: { title: string; body: string; uid: string }) {
    memoRef
      .add({
        title: memo.title,
        body: memo.body,
        uid: memo.uid,
        date: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        const data = {
          title: memo.title,
          body: memo.body,
          date: Date.now(),
          uid: memo.uid,
          id: docRef.id,
        }
        this.pushMemo(data)
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
  }

  @Action
  fetchMemos(uid: string) {
    this.clearMemo()
    memoRef
      // .orderBy('date', 'desc')
      .where('uid', '==', uid)
      .get()
      .then((res) => {
        res.forEach((doc) => {
          const data = {
            title: String(doc.data().title),
            body: String(doc.data().body),
            date: String(doc.data().date.toDate()),
            uid: String(doc.data().uid),
            id: String(doc.id),
          }
          this.pushMemo(data)
        })
      })
      .catch((error) => {
        console.log('error : ' + error)
      })
  }
}
