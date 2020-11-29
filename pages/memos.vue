<template>
  <div>
    <h1>Memo</h1>

    <div v-if="user" class="inner">
      <form>
        <div class="formgroup">
          <label for="memo_title">TITLE</label>
          <input v-model="newTitle" class="input" type="text" />
        </div>
        <div class="formgroup">
          <label for="memo_body">BODY</label>
          <textarea v-model="newBody" type="text" rows="5"></textarea>
        </div>
        <div>
          <input type="button" value="SUBMIT" @click="addMemo" />
        </div>
      </form>

      <h2>{{ user.userName }}'s memo</h2>
      <table v-if="user && memo">
        <thead>
          <tr>
            <th>#</th>
            <th>date</th>
            <th>title</th>
            <th>body</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(memo, index) in memo.memos" :key="memo.date">
            <td>{{ index + 1 }}</td>
            <td>{{ $moment(memo.date).format('llll') }}</td>
            <td>{{ memo.title }}</td>
            <td>{{ memo.body }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="user.uid">
        <a @click="fetchMemos">Reload</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import { userStore, memoStore } from '~/store'
import { MemoState } from '~/store/memo'
import { UserState } from '~/store/user'

@Component({
  computed: {
    ...mapState(['user']),
    ...mapState(['memo']),
  },
  middleware: 'checkAuthed',
})
export default class MemosPage extends Vue {
  public user!: UserState
  public memo!: MemoState

  newTitle: string = ''
  newBody: string = ''

  mounted() {
    if (this.user.uid) {
      memoStore.fetchMemos(this.user.uid)
    }
  }

  fetchMemos() {
    if (this.user.uid) memoStore.fetchMemos(this.user.uid)
  }

  addMemo() {
    if (userStore.isLogin && userStore.uid != null) {
      if (this.newTitle && this.newBody) {
        const title = this.newTitle
        const body = this.newBody
        const uid = userStore.uid
        memoStore.addMemo({ title, body, uid })
        this.newTitle = ''
        this.newBody = ''
      }
    }
  }
}
</script>
