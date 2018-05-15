<template lang="html">
  <div class="">
    <v-toolbar class="white">
      <v-spacer>
        <v-btn flat @click="toPage('/adpage')"><v-icon x-large>home</v-icon></v-btn>
      </v-spacer>
      <v-tabs fixed-tabs>
        <v-tab @click="toPage('/adpage')">
          Google Map
        </v-tab>
        <v-tab @click="toPage('/tabuser')">
          Manage User
        </v-tab>
      </v-tabs>
      <v-toolbar-items>
        <v-btn flat v-on:click="logout">Log Out</v-btn>
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
    },
    logout () {
      this.$cookies.remove('username')
      window.location = '/'
    }
  }
}
</script>

<style lang="css">
</style>
