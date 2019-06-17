<template>
  <div class="container mt-4 card">

    <table class="table mt-4">
      <thead class="thead-light">
        <tr>
          <th>#</th>
          <th>Asin</th>
          <th>Titulo</th>
          <th>Margen</th>
          <th>P. ML</th>
          <th>P. Prov</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <span v-if="editIndex !== index">{{ item.code }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" v-model="item.code">
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.name }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" v-model="item.name">
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.description }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" v-model="item.description">
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.qty }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" type="number" v-model.number="item.qty">
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.unit }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" v-model="item.unit">
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">
              <button @click="edit(item, index)" class="btn btn-outline-indigo btn-rounded btn-sm px-2">
                  <i class="fas fa-pencil-alt mt-0"></i>
              </button>
            </span>
            <span v-else>
              <button class="btn btn-sm btn-outline-secondary mr-2" @click="cancel(item)">Cancel</button>
              <button class="btn btn-sm btn-outline-secondary mr-2" @click="save(item)">Save</button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {

  name: 'Uhuy',

  filters: {
    money: (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
  },

  data() {
    return {
      editIndex: null,
      originalData: null,
      items: [
        { code: '111', name: 'Cuka', description: 'Cuka mahal', qty: 1,},
        { code: '222', name: 'Kubis', description: 'Kubis enak', qty: 2,},
      ],
      tax: 10,
    }
  },

  methods: {

    add() {
      this.originalData = null
      this.items.push({ code: '', name: '', description: '', qty: 1, unit: 1, price: 0, discount: 0 })
      this.editIndex = this.items.length - 1
    },

    edit(item, index) {
      this.originalData = Object.assign({}, item)
      this.editIndex = index
    },

    cancel(item) {
      this.editIndex = null

      if (!this.originalData) {
        this.items.splice(this.items.indexOf(item), 1)
        return
      }

      Object.assign(item, this.originalData)
      this.originalData = null
    },

    remove(item, index) {
      this.items.splice(index, 1)
    },

    save(item) {
      this.originalData = null
      this.editIndex = null
    },

    subtotal(item) {
      return (item.qty * item.price) - (item.qty * item.price * item.discount / 100)
    }

  },

  computed: {

    allSubTotal() {
      return this.items
        .map(item => this.subtotal(item))
        .reduce((a, b) => a + b, 0)
    },

    total() {
      return this.tax
        ? this.allSubTotal + (this.allSubTotal * (this.tax / 100))
        : this.allSubTotal
    }

  },

}
</script>

<style>
  input[type="number"] {
    text-align: right;
  }
</style>
