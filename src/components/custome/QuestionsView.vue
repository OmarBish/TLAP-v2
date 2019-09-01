<!-- =========================================================================================
  File Name: LevelQuestionsView.vue
  Description: sho

========================================================================================== -->

<template>
<div>
  <div id="data-list-thumb-view" class="data-list-container">

    <add-new-question-sidebar :isSidebarActive="AddNewQuestionSidebar" @closeSidebar="AddNewQuestionSidebar = false" />

    <vs-table ref="table"  @selected="handleSelected" v-model="selected"  pagination :max-items="itemsPerPage" search :data="questions">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center">

          

          <!-- ADD NEW -->
          <label for="active">Level Active</label>
          <vs-switch color="success" v-model="active" />
        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ users.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : users.length }} of {{ users.length }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
          <vs-dropdown-menu>

            <vs-dropdown-item @click="itemsPerPage=4">
              <span>4</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=10">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=15">
              <span>15</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=20">
              <span>20</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <template slot="thead">
        <vs-th>Image</vs-th>
        <vs-th sort-key="name">Name</vs-th>
        <!-- <vs-th sort-key="category">Category</vs-th> -->
        <vs-th sort-key="popularity">Popularity</vs-th>
        <vs-th sort-key="order_status">Question Status</vs-th>
        <vs-th sort-key="price">Score</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >

            <vs-td class="img-container">
              <img style="border-radius:100%" :src="tr.imgURL" class="product-img" />
            </vs-td>

            <vs-td>
              <p class="product-name font-medium">{{ tr.name }}</p>
            </vs-td>

            

            <vs-td>
              <vs-progress :percent="Number(tr.popularity)?Number(tr.popularity):20" :color="getPopularityColor(Number(tr.popularity))" class="shadow-md" />
            </vs-td>

            <vs-td>
              <vs-chip :color="getStatusColor(tr.status)" class="product-order-status">{{ getStatusText(tr.status) }}</vs-chip>
            </vs-td>

            <vs-td>
              <p class="product-price">${{ tr.price }}</p>
            </vs-td>
            
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
    <!-- Add new button  -->
  </div>
  <vs-button @click="AddNewQuestionSidebar = true" class="ml-auto md:block cursor-pointer hover-p" color="primary" radius icon="icon-plus" icon-pack="feather"></vs-button>
</div>
</template>

<script>
import AddNewQuestionSidebar from './forms/AddNewQuestionSidebar.vue';

export default {
  components: {
    AddNewQuestionSidebar
  },
  data() {
    return {
      selected: [],
      users: [],
      itemsPerPage: 4,
      isMounted: false,
      AddNewQuestionSidebar: false,
    }
  },
  computed: {
    currentPage() {
      if(this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    questions(){
      return this.$store.getters['questions/getQuestions']
    }
  },
  props:{
    levelID : {
      type: String,
      required: true
    },
    active:{
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleSelected(tr){
      console.log(tr)
      this.$router.push({ name: 'singleQuestion', params: { id: tr.id }})
    },
    getStatusText(status) {
      if(!status) return "Need work"
      if(status == 'delivered') return "success"
      if(status == 'canceled') return "danger"
      return "primary"
    },
    getStatusColor(status) {
      if(!status) return "danger"
      if(status == 'delivered') return "success"
      if(status == 'canceled') return "warning"
      return "primary"
    },
    getPopularityColor(num) {
      if(num > 90) return "success"
      if(num >70) return "primary"
      if(num >= 50) return "warning"
      if(num < 50) return "danger"
      return "primary"
    },
    formatData(data) {
      // formats data received from API
      let formattedData = data.map((item) => {
        const fields = item.fields
        let obj = {}
        for (const key of Object.keys(fields)) {
            obj[key] = Number(fields[key].integerValue) || Number(fields[key].doubleValue) || fields[key].stringValue;
        }
        return obj
      });
      return formattedData
    }
  },
  created() {
    console.log('this.levelID',this.levelID)

    this.$store.dispatch('questions/fetchQuestions',this.levelID)
  },
  mounted() {
    this.isMounted = true;
  }
}
</script>

<style lang="scss">

.hover-p:hover{
  color:#fff;
}
#data-list-thumb-view {
  .vs-con-table {

    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;


      tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 10px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
            &.img-container {
              // width: 1rem;
              // background: #fff;

              span {
                display: flex;
                justify-content: center;
              }

              .product-img {
                height: 110px;
              }
            }
          }
          td.td-check{
            padding: 20px !important;
          }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
