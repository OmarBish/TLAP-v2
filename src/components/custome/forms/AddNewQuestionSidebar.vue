<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>ADD NEW QUESTION</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">

      <div class="p-6">
        <!-- NAME -->
        <vs-input label="Name" name="name" v-model="name" class="mt-5 w-full" />

        <!-- levels -->
        <vs-select v-model="level" label="Level" class="mt-5 w-full">
          <vs-select-item :key="item.value" :value="item.id" :text="item.name" v-for="item in levels" />
        </vs-select>

        <!-- IMG -->
        <vs-button :color="uploadButtonColor" type="border" icon="cloud_upload" class="mt-5 w-full" @click="$refs.fileInput.click()">upload</vs-button>
        <input type="file" style="display:none" ref="fileInput" accept="image/*" @change="handleFileUpload">
        <img :src="imageURL" width="80%" class="mt-5 ma">
        <vs-progress :percent="uploadTask.progress" color="primary"></vs-progress>
        <p class="small">{{uploadTask.status}}</p>

      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitQuestion">Add Question</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      name: '',
      level: '',
      uploadButtonColor:'primary',
      imageURL:'',
      imageFile:null,
      
      
      settings: { // perfectscrollbar settings
          maxScrollbarLength: 60,
          wheelSpeed: .60,
      },
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive
      },
      set(val) {
        if(!val) {
          this.$emit('closeSidebar');
        }
      }
    },
    levels(){
      return this.$store.getters['levels/getLevels']
    },
    uploadTask(){
      return this.$store.getters['questions/getUploadProgress']
       
    }
  },
  methods: {
    handleFileUpload(event){
      const files = event.target.files
      let fileName = files[0].name 
      if(fileName.lastIndexOf('.') <= 0){
        this.uploadButtonColor = 'danger'
        this.$vs.notify({
          title:'invalid file extintion',
          text:'please upload a valid image',
          color:'warning'
        })
        return;
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load',()=>{
        this.imageURL = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.imageFile = files[0]

    },
    submitQuestion(){
      let payload={
        question:{
          name:this.name,
          level_id:this.level,
          imgURL:'https://dummyimage.com/400/000000/ffffff'
        },
        notify:this.$vs.notify,
        imageFile:this.imageFile
      }
        this.$store.dispatch('questions/addQuestion',payload)

    }
  },
  components: {
    VuePerfectScrollbar,
  }
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
    height: calc(100% - 4.3rem);
}
</style>
