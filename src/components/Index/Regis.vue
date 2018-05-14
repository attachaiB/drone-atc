<template lang="html">
  <div>
    <Navbar/>
    <Regisform/>

  </div>
</template>

<script>
import Navbar from '@/components/Index/Navbar'
import Regisform from '@/components/Authen/Regisform'
export default {
  components: {
    Navbar,
    Regisform
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
  mounted () {
    this.checkCookie()
  }
}
</script>

<style lang="css">
</style>
