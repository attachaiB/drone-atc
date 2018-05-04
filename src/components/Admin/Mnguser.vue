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
                <v-text-field label="Drone ID" v-model="editedItem.droneID"></v-text-field>
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
      <td class="text-xs-center">{{ props.item.droneID }}</td>
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
    dialog: false,
    headers: [
      { align: 'center', text: 'Name', value: 'name' },
      { align: 'center', text: 'Drone ID', value: 'droneID' },
      { align: 'center', text: 'Username', value: 'username' },
      { align: 'center', text: 'Created at', value: 'created_at' },
      { align: 'center', text: 'Updated at', value: 'updated_at' },
      { align: 'center', text: 'Actions', value: 'name', sortable: false }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      droneID: 0,
      username: '',
      created_at: 0,
      updated_at: 0
    },
    defaultItem: {
      name: '',
      droneID: 0,
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
      this.items = [
        {
          name: 'Frozen Yogurt',
          droneID: 159,
          username: 'Yogurt',
          created_at: '2018-05-04 16:00:00',
          updated_at: '2018-05-04 16:00:00'
        },
        {
          name: 'Ice cream sandwich',
          droneID: 237,
          username: 'sandwich',
          created_at: '2018-05-04 16:00:00',
          updated_at: '2018-05-04 16:00:00'
        },
        {
          name: 'Eclair',
          droneID: 262,
          username: 'Eclair',
          created_at: '2018-05-04 16:00:00',
          updated_at: '2018-05-04 16:00:00'
        },
        {
          name: 'Cupcake',
          droneID: 305,
          username: 'Cupcake',
          created_at: '2018-05-04 16:00:00',
          updated_at: '2018-05-04 16:00:00'
        }
      ]
    },

    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
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
