<template lang="html">
  <div>
    <Navbar/>
    <Loginform/>

  </div>
</template>

<script>
import Navbar from '@/components/Index/Navbar'
import Loginform from '@/components/Authen/Loginform'
export default {
  components: {
    Navbar,
    Loginform
  }
}
</script>

<style lang="css">
</style>
