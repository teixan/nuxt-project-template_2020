<template>
  <div class="inner">
    <h1>Login page</h1>
    <template v-if="user.uid">
      <p>Logged in as : {{ user.userName }}</p>
      <button @click="logout">ログアウト</button>
    </template>
    <template v-else>
      <button @click="login">ログイン</button>
    </template>
    <nuxt-link to="/">トップへ</nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import { userStore } from '@/store'
import { UserState } from '@/store/user'

@Component({
  computed: {
    ...mapState(['user']),
  },
})
export default class LoginPage extends Vue {
  public user!: UserState

  public login(): void {
    userStore.login()
  }

  public logout(): void {
    userStore.logout()
  }
}
</script>
