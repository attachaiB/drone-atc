<template lang="html">
  <div class="">
    <v-toolbar class="white">
      <v-spacer>
        <v-btn flat @click="toPage('/user')"><v-icon x-large>home</v-icon></v-btn>
      </v-spacer>
      <v-toolbar-items>
        <v-btn flat @click="topage('/logout')">Log Out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view/>
  </div>
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
