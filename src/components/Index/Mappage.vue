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
      if (this.$cookies.get('username') == null) {
        window.location = '/'
      } else if (enper === 'Admin') {
        window.location = '/adpage'
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
