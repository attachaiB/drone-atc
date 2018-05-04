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
  }
}
</script>

<style lang="css">
</style>
