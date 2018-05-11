<template lang="html">
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="grey darken-2">
                <v-toolbar-title>Drone ATC</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="username" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-2" dark v-on:click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    username: '',
    password: ''
  }),
  props: {
    source: String
  },
  methods: {
    login () {
      var data = {
        'username': this.username,
        'password': this.password
      }
      this.axios.post('http://127.0.0.1:5000' + '/login', data).then((response) => {
        // var result = JSON.parse(response.data)
        var result = response.data
        if (response.status === 200) {
          if (result.status === 'success') {
            if (result.info.permission === 'Admin') {
              var enper = btoa(result.info.permission)
              this.$cookies.set('username', enper, null, '/', 'localhost')
              window.location = '/adpage'
            }
            if (result.info.permission === 'User') {
              window.location = '/user'
            }
          } else {
            this.$swal('ผิดพลาด !', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'error')
          }
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
