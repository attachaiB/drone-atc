<template lang="html">
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">Add Admin</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Name" v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Surname" v-model="editedItem.surname"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Person ID" v-model="editedItem.person_id"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="username" v-model="editedItem.username"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Password" v-model="editedItem.password"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="รหัสผลิตภัณฑ์" v-model="editedItem.comreg_num"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Company Name" v-model="editedItem.company_name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="E-Mail" v-model="editedItem.email"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Phone" v-model="editedItem.phone"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    class="elevation-1"
    >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ props.item.name }}</td>
      <td class="text-xs-center">{{ props.item.surname }}</td>
      <td class="text-xs-center">{{ props.item.drone_id }}</td>
      <td class="text-xs-center">{{ props.item.username }}</td>
      <td class="text-xs-center">{{ props.item.comreg_num }}</td>
      <td class="text-xs-center">{{ props.item.company_name }}</td>
      <td class="justify-center layout px-0">
        <v-btn icon class="mx-0" @click="editItem(props.item)">
          <v-icon color="teal">edit</v-icon>
        </v-btn>
        <v-btn icon class="mx-0" @click="deleteItem(props.item)">
          <v-icon color="pink">delete</v-icon>
        </v-btn>
      </td>
    </template>
    <template slot="no-data">
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</div>
</template>

<script>
export default {
  data: () => ({
    drone_id: '',
    dialog: false,
    headers: [{
      align: 'center',
      text: 'Name',
      value: 'name'
    },
    {
      align: 'center',
      text: 'Surname',
      value: 'surname'
    },
    {
      align: 'center',
      text: 'Drone ID',
      value: 'drone_id'
    },
    {
      align: 'center',
      text: 'Username',
      value: 'username'
    },
    {
      align: 'center',
      text: 'รหัสผลิตภัณฑ์',
      value: 'comreg_num'
    },
    {
      align: 'center',
      text: 'Company Name',
      value: 'company_name'
    },
    {
      align: 'center',
      text: 'Actions',
      value: 'actions',
      sortable: false
    }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      username: '',
      surname: '',
      password: '',
      person_id: '',
      comreg_num: '',
      company_name: '',
      email: '',
      phone: ''
    },
    defaultItem: {
      name: '',
      username: '',
      surname: '',
      comreg_num: '',
      company_name: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Add Admin' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      var id = atob(this.$cookies.get('userdrone'))
      var myid = {
        'did': id
      }
      this.axios.post('http://127.0.0.1:5000' + '/getUser', myid).then((response) => {
        var result = response.data
        this.items = result
      })
    },

    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      var data = {
        'drone_id': item.drone_id
      }
      const index = this.items.indexOf(item)
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (!result.value) {
          this.axios.post('http://127.0.0.1:5000' + '/delUser', { data: data }).then((response) => {
            var result = response.data
            if (response.status === 200) {
              if (result.status === 'success') {
                this.$swal(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                ) && this.items.splice(index, 1)
              } else {
                this.$swal('ผิดพลาด !', 'ทำรายการผิดพลาด', 'error')
              }
            } else {
              alert(3)
            }
          })
        }
      })
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      var data = {
        'name': this.editedItem.name,
        'username': this.editedItem.username,
        'surname': this.editedItem.surname,
        'password': this.editedItem.password,
        'person_id': this.editedItem.person_id,
        'comreg_num': this.editedItem.comreg_num,
        'company_name': this.editedItem.company_name,
        'email': this.editedItem.email,
        'phone': this.editedItem.phone
      }
      this.axios.post('http://127.0.0.1:5000' + '/addAdmin', data).then((response) => {
        var result = response.data
        if (response.status === 200) {
          if (result.status === 'success') {
            this.$swal('สำเร็จ !', 'ทำรายการสำเร็จ', 'success')
          } else {
            this.$swal('ผิดพลาด !', 'ทำรายการผิดพลาด', 'error')
          }
        }
      })
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style lang="css">
</style>
