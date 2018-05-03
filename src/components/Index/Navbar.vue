<template lang="html">
  <v-toolbar>
   <v-spacer>
     <v-btn flat @click="topage('/')"><v-icon x-large>home</v-icon></v-btn>
   </v-spacer>
   <v-toolbar-items>
     <v-btn flat @click="topage('/login')">Log IN</v-btn>
     <v-btn flat>Register</v-btn>
   </v-toolbar-items>
 </v-toolbar>
</template>

<script>
export default {
  methods: {
    toPage (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="css">
</style>
