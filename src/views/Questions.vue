<template>
  <div class="mt-5">
    <h1 class="mb-5 text-center">Levels</h1>
    <vs-tabs alignment="fixed">
      <vs-tab label="Easy">
        <div>
			<questions></questions>
		</div>
      </vs-tab>
      <vs-tab label="Medium">
        <div>
			<questions></questions>
		</div>
      </vs-tab>
      <vs-tab label="Hard">
        <div>
			<questions></questions>
		</div>
      </vs-tab>
      <vs-tab label="Expert">
        <div>
			<questions></questions>
		</div>
      </vs-tab>
	  <vs-tab label="Hell">
        <div>
			<questions></questions>
		</div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
import Questions from "../components/custome/QuestionsView.vue"
export default {
	components:{
		Questions
	}

}

</script>
