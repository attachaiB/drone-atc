<template lang="html">
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
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
                <v-text-field label="Drone ID" v-model="drone_id"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="username" v-model="editedItem.username"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Created at" v-model="editedItem.created_at"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Updated at" v-model="editedItem.updated_at"></v-text-field>
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
      <td>{{ props.item.name }}</td>
      <td class="text-xs-center">{{ props.item.drone_id }}</td>
      <td class="text-xs-center">{{ props.item.username }}</td>
      <td class="text-xs-center">{{ props.item.created_at }}</td>
      <td class="text-xs-center">{{ props.item.updated_at }}</td>
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
      text: 'Created at',
      value: 'created_at'
    },
    {
      align: 'center',
      text: 'Updated at',
      value: 'updated_at'
    },
    {
      align: 'center',
      text: 'Actions',
      value: 'name',
      sortable: false
    }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      username: '',
      created_at: 0,
      updated_at: 0
    },
    defaultItem: {
      name: '',
      drone_id: 0,
      username: '',
      created_at: 0,
      updated_at: 0
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
      var data = {
        'drone_id': this.drone_id
      }
      this.axios.post('http://127.0.0.1:5000' + '/getUser', data).then((response) => {
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
