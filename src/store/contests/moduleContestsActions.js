/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import firebase from 'firebase/app'
import 'firebase/firestore'
let db = firebase.firestore();

const actions = {
  fetchContests({commit}){
    db.collection("contests").get().then( (querySnapshot) => {
      let contests =[]
      querySnapshot.forEach((doc) => {
        const contest = {
          id:doc.id,
          name:doc.data().name,
          imgURL:doc.data().imgURL,
          description:doc.data().description,
          active:doc.data().active,
          duration:doc.data().duration
        }
        contests.push(contest);
      });
      commit('setContests',contests)
    });
  },
  deleteContest({commit},payload){
    console.log('delete payload', payload)
    let id =payload.id;
    db.collection('contests').doc(id).delete().then( () => {
      commit('deleteContest',id);
    }).catch((err)=>{
      console.error(err)
      payload.notify({
          time: 8800,
          title: 'Error',
          text: err,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
      })
    });
  },
  disableContest({commit},payload){
    let id =payload.id;
    db.collection('contests').doc(id).update({
      active:false
    }).then( () => {
      commit('disableContest',id);
    }).catch((err)=>{
      console.error(err)
      payload.notify({
          time: 8800,
          title: 'Error',
          text: err,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
      })
    });
  },
  activateContest({commit},payload){
    let id =payload.id;
    db.collection('contests').doc(id).update({
      active:true
    }).then( () => {
      commit('activateContest',id);
    }).catch((err)=>{
      console.error(err)
      payload.notify({
          title: 'Error',
          text: err,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
      })
    });
  },
  addContest({commit},payload){
    let data = payload.contest
    db.collection('contests').add(data)
    .then((res)=>{
      data.id = res.id
      if(payload.imageFile){
        //img upload to firestorage
        var storageRef = firebase.storage().ref();
        var questionImagesRef = storageRef.child('images/contests/'+res.id);
  
        let uploadTask = questionImagesRef.put(payload.imageFile)
        uploadTask.on('state_changed', function(snapshot){
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          let task = {
            status:snapshot.state,
            progress:progress
          }
          commit('setUploadProgress',task)
        },function(err) {
            console.error(err);
            payload.notify({
              title: 'Error',
              text: 'See log for more info',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
        }, function() {
          // Handle successful uploads on complete
          console.log('file uploaded successfuly');
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            db.collection('contests').doc(res.id).update({
              imgURL:downloadURL
            }).then(()=>{
              payload.notify({
                title:'Success',
                text:'Question added successfully',
                color:'success',
                iconPack: 'feather',
                icon:'icon-check'
              })
              commit('setUploadProgress',{
                status:'COMPLEATED',
                progress:100
              })
              data.imgURL = downloadURL
              commit('addContest',data);
              payload.notify({
                title: 'Success',
                text: 'Contest addedd successfuly',
                color: 'success'
              })
            })
          });
        });
      }else{
        // set default img
        commit('addContest',data);
        payload.notify({
          title: 'Success',
          text: 'Contest addedd successfuly',
          color: 'success'
        })
      }
    }).catch((err)=>{
      console.error(err);
      payload.notify({
        title: 'Error',
        text: 'See log for more info',        
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      })
    })
  }
}

export default actions
