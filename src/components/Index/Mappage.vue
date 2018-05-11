<template lang="html">
  <div>
    <Userbar/>
    <Profile/>
    <Googlemap/>

  </div>
</template>

<script>
import Userbar from '@/components/User/Userbar'
import Profile from '@/components/User/Profile'
import Googlemap from '@/components/Index/Googlemap'
export default {
  components: {
    Userbar,
    Profile,
    Googlemap
  },
  methods: {
    checkCookie () {
      var enper = atob(this.$cookies.get('username'))
      if (enper === 'Admin') {
        window.location = '/adpage'
      } else if (enper === 'User') {
        window.location = '/user'
      }
    }
  },
  created: function () {
    this.checkCookie()
  }
}
</script>

<style lang="css">
</style>
