<template>
<vx-card title="Scoreboard">
  <vs-table :data="users" pagination max-items="3">

    <template slot="thead">
      <vs-th>Rank</vs-th>
      <vs-th>Name</vs-th>
      <vs-th>Score</vs-th>
    </template>

    <template slot-scope="{data}">
      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
        <vs-td :data="tr.rank">
          {{ tr.rank }}
        </vs-td>
        <vs-td :data="tr.name">
          {{ tr.name }}
        </vs-td>
        <vs-td :data="tr.score">
          {{ tr.score }}
        </vs-td>
          <template class="expand-user" slot="expand">
            <div class="con-expand-users w-full">
              <div class="con-btns-user flex items-center justify-between">
                <div class="con-userx flex items-center justify-start">
                  <vs-avatar :badge="tr.id" size="45px" :src="tr.image" />
                  <span>{{ tr.name }}</span>
                </div>
                <div class="flex">
                  <!-- <vs-button type="border" size="small" icon-pack="feather" icon="icon-phone" class="mr-2"></vs-button>
                  <vs-button type="border" size="small" icon-pack="feather" icon="icon-send" color="success" class="mr-2"></vs-button>
                  <vs-button type="border" size="small" icon-pack="feather" icon="icon-trash" color="danger"></vs-button> -->
                </div>
              </div>
              <vs-list>
                <p>Last Solved Qustions</p>
                <ul class="users-liked user-list mt-1">
                    <li v-for="(user, userIndex) in data[indextr].solvedQuestions" :key="userIndex">
                        <vx-tooltip :text="user.name" position="bottom">
                          <vs-avatar :src="user.img" size="30px" class="border-2 border-white border-solid -m-1"></vs-avatar>
                        </vx-tooltip>
                    </li>
                </ul>
                                    <!-- <vs-list-item icon-pack="feather" icon="icon-globe" :title="tr.website"></vs-list-item> -->
              </vs-list>
            </div>
          </template>
      </vs-tr>
    </template>
  </vs-table>
</vx-card>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
let db = firebase.firestore();
export default {
  data() {
    return {
      users: [
          // {
          //     "rank": 1,
          //     "name": "Leanne Graham",
          //     "score": 15,
          //     solvedQuestions: [
          //               { name: 'Vennie Mostowy', img: 'avatar-s-5.png' },
          //               { name: 'Elicia Rieske', img: 'avatar-s-7.png' },
          //               { name: 'Julee Rossignol', img: 'avatar-s-10.png' },
          //               { name: 'Darcey Nooner', img: 'avatar-s-8.png' }
          //           ],
          // }

      ]
    }
  },
  methods:{
    getScoreboard(){
        return axios.get('api/scoreboard')
    }
  },
  created(){
    db.collection("users").orderBy('score','desc').get().then((querySnapshot) => {
      let rank = 1;
    querySnapshot.forEach((doc) => {
      const user = {
        rank: rank++,
        name:doc.data().name,
        score:doc.data().score,
        solvedQuestions:doc.data().recentQuestions
      }
      this.users.push(user);
      console.log(doc.id , doc.data());
      console.log(doc.id , doc.data().recentQuestions);
    });
     
});
  }
}
</script>