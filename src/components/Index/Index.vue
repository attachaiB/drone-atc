<template lang="html">
  <div>
    <Navbar/>
    <Googlemap/>
  </div>
</template>

<script>
import Navbar from '@/components/Index/Navbar'
import Googlemap from '@/components/Index/Googlemap'
export default {
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
  },
  components: {
    Navbar,
    Googlemap
  }
}
</script>

<style lang="css">
</style>
