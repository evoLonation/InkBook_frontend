import firebase from "firebase/app";
import "firebase/database"
import   "firebase/analytics"

const firebaseConfig = {
    apiKey: "AIzaSyB6bzpbn8SzyNRMoKH_w2JM97tnVWdcvaM",
    authDomain: "inkbook-cb595.firebaseapp.com",
    projectId: "inkbook-cb595",
    storageBucket: "inkbook-cb595.appspot.com",
    messagingSenderId: "858371951645",
    appId: "1:858371951645:web:537e40acc6f305abc10af4",
    measurementId: "G-9RP1HQXYQR",
    databaseURL: "https://inkbook-cb595-default-rtdb.asia-southeast1.firebasedatabase.app/",
};



// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics(firebaseApp);
console.log(analytics);
export const db = firebase.database();
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }
// db.settings({ timestampsInSnapshots: true });

export async function writeData(path, obj) {
    console.log("will write user data")
    await db.ref(path).set(
        obj
    ).then(() => {
        console.log("write success")
    });
}
export function onDataChange(path, func){

    const starCountRef = db.ref(path);
    // starCountRef.on('value', (snapshot) => {
    //     const data = snapshot.val();
    //     updateStarCount(postElement, data);
    // });
    starCountRef.on('value', (snapshot) => {
        console.log("user data change")
        const data = snapshot.val();
        func(data);
    });
}
export async function getData(path) {
    let ret = null
    await db.ref(path).get().then( snapshot => {
        if (snapshot.exists()) {
            ret = snapshot.val()
        } else {
            console.log("No data available");
        }
    })
    return ret;
}