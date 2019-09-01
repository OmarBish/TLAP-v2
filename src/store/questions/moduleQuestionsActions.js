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
import 'firebase/firebase-storage'
let db = firebase.firestore();

const actions = {
  fetchQuestions({commit},levelID){
    db.collection("questions").where("level_id",'==',levelID).get()
    .then( (querySnapshot) => {
      let questions =[]
      querySnapshot.forEach((doc) => {
        const question = {
          id:doc.id,
          name:doc.data().name,
          imgURL:doc.data().imgURL,
          popularity:doc.data().popularity,
        }
        questions.push(question);
      });
      commit('setQuestions',questions)
    });
  },
  addQuestion({commit},payload){
    let data = payload.question
    db.collection('questions').add(data)
    .then((res)=>{
      data.id = res.id
      var storageRef = firebase.storage().ref();
      var questionImagesRef = storageRef.child('images/questions/'+res.id);

      let uploadTask = questionImagesRef.put(payload.imageFile)
      uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        let task = {
          status:snapshot.state,
          progress:progress
        }
        commit('setUploadProgress',task)
      },function(error) {
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        console.log('file uploaded successfuly');
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          db.collection('questions').doc(res.id).update({
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
            commit('addQuestion',data);
          })
        });
      });
    }).catch((err)=>{
      console.error(err);
      payload.notify({
        title: 'Error',
        text: err,
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
    })
    })
  }
}

export default actions
