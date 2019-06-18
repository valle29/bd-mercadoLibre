<template>
  <div class="container mt-4 card">

    <div>
      <table ref="dtTable" id="dtTable" class="table table-sm mt-3">
        <thead class="thead-light">
          <tr>
            <th>#</th>
            <th>Asin</th>
            <th>Titulo</th>
            <th>Margen</th>
            <th>P. ML</th>
            <th>P. Prov</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <th>{{ item.ml_data_id }}</th>
            <td>{{ item.asin }}</td>
            <td>
              <span v-if="editIndex !== index">{{ item.title }}</span>
              <span v-if="editIndex === index">
                <input class="form-control form-control-sm" v-model="item.title">
              </span>
            </td>
            <td>
              <span v-if="editIndex !== index">{{ item.margen }}</span>
              <span v-if="editIndex === index">
                <input class="form-control form-control-sm" type="number" v-model.number="item.margen">
              </span>
            </td>
            <td>${{ item.ml_price }}</td>
            <td>${{ item.provider_price }}</td>
            <td>
              <span v-if="editIndex !== index">
                <button @click="edit(item, index)" class="btn btn-outline-indigo btn-sm px-2 mt-0 mb-0 ml-0 mr-0">
                    <i class="fas fa-pencil-alt mt-0"></i>
                </button>
              </span>
              <span v-else>
                <mdb-row>
                  <button class="btn btn-sm btn-outline-danger btn-sm px-2 mt-0 mb-0 ml-0 mr-0" @click="cancel(item)">
                    <i class="fas fa-times"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-success btn-sm px-2 mt-0 mb-0 ml-0 mr-0" @click="save(item)">
                    <i class="fas fa-save"></i>
                  </button>
                </mdb-row>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <mdb-pagination class="mb-4">
        <mdb-page-nav prev v-on:click.native="selectPage(pagination.items[0])" v-bind:class="{'is-disabled': this.pagination.currentPage==this.pagination.items[0] || this.pagination.items.length==0}"></mdb-page-nav>
        <span
          v-for="(item, index) in 5"
          :key="index">
          <span v-if="item === pagination.currentPage">
            <mdb-page-item
              active
              v-on:click.native="selectPage(item)" v-bind:class="{'is-info': item == pagination.currentPage}">
                {{item}}
            </mdb-page-item>
          </span>
          <span>
            <mdb-page-item
              v-on:click.native="selectPage(item)" v-bind:class="{'is-info': item == pagination.currentPage}">
                {{item}}
            </mdb-page-item>
          </span>
        </span>
        <mdb-page-nav next v-on:click.native="selectPage(pagination.items[pagination.items.length-1])" v-bind:class="{'is-disabled': this.pagination.currentPage==this.pagination.items[this.pagination.items.length-1] || this.pagination.items.length==0}"></mdb-page-nav>
      </mdb-pagination>
    </div>
    

  </div>
</template>

<script>
import axios from 'axios';
import {mdbRow, mdbPagination, mdbPageItem, mdbPageNav} from 'mdbvue';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

/*Vue.filter('numeral', function(value){
  return numeral(value).format('0.0');
});*/

export default {

  name: 'Productos',

  components: {
    mdbRow,
    mdbPagination,
    mdbPageItem,
    mdbPageNav
  },

  filters: {
    money: (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
  },

  data() {
    return {
      editIndex: null,
      originalData: null,
      perPage: 25,
      currentPage: 1,
      items: [],
      tax: 10,
      searchItem: '',
      filteredItems: [],
      paginatedItems: [],
      selectedItems: [],
      pagination: {
        range: 5,
        currentPage: 1,
        itemPerPage: 15,
        items: [],
        filteredItems: [],
      }
    }
  },
  created: function(){
    var self = this;
    
    axios.get('http://192.168.0.109/bd-mercadolibre/public/productos')
      .then(function(response){
        var data = response.data;
        data.forEach(function(item){
          self.items.push({
            ml_data_id: item.ml_data_id,
            asin: item.asin,
            title: item.title,
            margen: item.provider_id,
            ml_price: item.ml_price,
            provider_price: item.provider_price,
            selected: false
          })
        })
        //self.items =response.data;
      })
      .catch(function(error){
        console.log(error)
      });
      
    this.filteredItems = this.items
    this.buildPagination()
    this.selectPage(1) 
    console.log(this.filteredItems)
  },
  mounted: function(){
    var dataTable = document.getElementById("dtTable");
    //dataTable.DataTable({});
    
    //  $('.dataTables_length').addClass('bs-select');
    
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
    },

    clearSearchItem(){
      this.searchItem = undefined
      this.searchInTheList('')
    },
    searchInTheList(searchText, currentPage){
      if(_.isUndefined(searchText)){
        this.filteredItems = _.filter(this.items, function(v,k){
          return !v.selected
        })
      }
      else{
        this.filteredItems = _.filter(this.items, function(v,k){
          return !v.selected && v.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        })
      }

      this.buildPagination()

      if(_.isUndefined(currentPage)){
        this.selectPage(1)
      }
      else{
        this.selectPage(currentPage)
      }
    },
    buildPagination(){
      let numberOfPage = Math.ceil(this.filteredItems.length / this.pagination.itemPerPage)
      this.pagination.items = []
      for(var i = 0; i<numberOfPage; i++){
        this.pagination.items.push(i+1)
      }
    },
    selectPage(item){
      console.log('Selected'+item)
      this.pagination.currentPage = item
      let start = 0
      let end = 0
      if(this.pagination.currentPage < this.pagination.range-2){
        start = 1
        end = start + this.pagination.range-1
      }
      else if(this.pagination.currentPage <= this.pagination.items.length && this.pagination.currentPage > this.pagination.items.length - this.pagination.range + 2){
        start = this.pagination.items.length - this.pagination.range+1
        end = this.pagination.items.length
      }
      else{
        start = this.pagination.currentPage-2
        end = this.pagination.currentPage+2
      }
      if(start<1){
        start = 1
      }
      if(end>this.pagination.items.length){
        end = this.pagination.items.length
      }

      this.pagination.filteredItems = []
      for(var i = start; i<=end; i++){
        this.pagination.filteredItems.push(i)
      }

      this.paginatedItems = this.filteredItems.filter((v,k) => {
        return Math.ceil((k+1) / this.pagination.itemPerPage) == this.pagination.currentPage
      })
    },
    selectItem(item){
      item.selected = true
      this.selectedItems.push(item)
      this.searchInTheList(this.searchItem, this.pagination.currentPage)
    },
    removeSelectedItem(item){
      item.selected = false
      this.selectedItems.$remove(item)
      this.searchInTheList(this.searchItem, this.pagination.currentPage)
    }

  },

  computed: {
    rows(){
      return this.items.length
    },

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

  table.dataTable thead .sorting:after,
  table.dataTable thead .sorting:before,
  table.dataTable thead .sorting_asc:after,
  table.dataTable thead .sorting_asc:before,
  table.dataTable thead .sorting_asc_disabled:after,
  table.dataTable thead .sorting_asc_disabled:before,
  table.dataTable thead .sorting_desc:after,
  table.dataTable thead .sorting_desc:before,
  table.dataTable thead .sorting_desc_disabled:after,
  table.dataTable thead .sorting_desc_disabled:before {
    bottom: .5em;
  }
</style>
