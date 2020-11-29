<template>
  <div class="container">
    <div>
      <h1 class="title">{{ title }}</h1>
      <template v-if="user.uid">
        <p>{{ user.userName }}</p>
      </template>
      <nuxt-link to="/login">ログインページへ</nuxt-link>
      <nuxt-link to="/memos">メモ</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { mapState } from 'vuex'

@Component({
  computed: {
    ...mapState(['user']),
  },
})
export default class Index extends Vue {
  public title: string | '' = ''

  mounted() {
    this.title = process.env.TITLE ? process.env.TITLE : ''
  }
}
</script>
