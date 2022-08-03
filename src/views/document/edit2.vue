<template>
<!--  <codemirror-->
<!--      v-model="code"-->
<!--      placeholder="Code goes here..."-->
<!--      :style="{ height: '400px' }"-->
<!--      :autofocus="true"-->
<!--      :indent-with-tab="true"-->
<!--      :tab-size="2"-->
<!--      :extensions="extensions"-->
<!--      @ready="log('ready', $event)"-->
<!--      @change="log('change', $event)"-->
<!--      @focus="log('focus', $event)"-->
<!--      @blur="log('blur', $event)"-->
<!--  />-->
  <div id="firepad" ref="myDiv">123</div>
</template>
<script>
import Firepad from 'firepad'
// import { Codemirror } from 'vue-codemirror'
import Codemirror from "codemirror"

// import {javascript} from "@codemirror/lang-javascript"
import firebase from "firebase/compat/app";
import 'firebase/compat/database'

export default {
  // components: {
  //   Codemirror
  // },
  setup() {

  },
  mounted () {

    let ref = firebase.database().ref()
    // let hash = window.location.hash.replace(/#/g, '');
    // if (hash) {
    //   ref = ref.child(hash);
    // } else {
    //   ref = ref.push(); // generate unique location.
    //   window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
    // }
    console.log('Firebase data.js: ', ref.toString());
    console.log(this.$refs.myDiv)

    let codeMirror = Codemirror(
      // document.getElementById('firepad'),
      this.$refs.myDiv,
      {
        lineNumbers: true,
        mode: 'javascript'
      },
    )
    console.log(codeMirror)
    let firepad1 = Firepad.fromCodeMirror(ref, codeMirror,
        { richTextShortcuts: true, richTextToolbar: true, defaultText: 'Hello, World!' })
    firepad1.on('ready', function() {
      if (Firepad.isHistoryEmpty()) {
        Firepad.setText('Check out the user list to the left!');
      }
    });


    // let Firepad  = require('firepad');
    // let config = {
    //   apiKey: "AIzaSyB6bzpbn8SzyNRMoKH_w2JM97tnVWdcvaM",
    //   authDomain: "inkbook-cb595.firebaseapp.com",
    //   projectId: "inkbook-cb595",
    //   storageBucket: "inkbook-cb595.appspot.com",
    //   messagingSenderId: "858371951645",
    //   appId: "1:858371951645:web:537e40acc6f305abc10af4",
    //   measurementId: "G-9RP1HQXYQR"
    // };
    // firebase.initializeApp(config);
    //
    //
    //
    // let rootRef = firebase.database().ref();
    // let firepadRef = rootRef.push();
    // let headless = new Firepad.Headless(firepadRef);
    // console.log(headless)
  },

}
</script>

<style scoped>

</style>