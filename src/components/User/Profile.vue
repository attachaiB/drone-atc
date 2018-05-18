<template lang="html">
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs3>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-card-text v-model="username">Username : AAAAAAA</v-card-text>
          <v-card-text v-model="drone_id">Drone ID : 0000000</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-card-text v-model="name">Name : ATTACHAI</v-card-text>
          <v-card-text v-model="surname">Surname : BOONLENG</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    myProfile: []
  }),
  method: {
    getProfile () {
      var id = atob(this.$cookies.get('userdrone'))
      var myid = {
        'mid': id
      }
      this.axios.post('http://127.0.0.1:5000' + '/getProfile', myid).then((response) => {
        var result = response.data
        console.log(result)
      })
    }
  }
}
</script>

<style lang="css">
</style>
