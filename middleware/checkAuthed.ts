import { userStore } from '@/store'

export default function ({ redirect }: { redirect: any }) {
  try {
    if (userStore.isLogin) return
    return redirect('/login')
  } catch (e) {
    console.error(`error=${e}`, e)
  }
}
