import firebase from 'firebase'
import "@firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyD8p0h4rG5NxTIc9wVD_NU7QEF3JqBoFQg",
    authDomain: "survey-app-d31b4.firebaseapp.com",
    projectId: "survey-app-d31b4",
    storageBucket: "survey-app-d31b4.appspot.com",
    messagingSenderId: "183910070932",
    appId: "1:183910070932:web:c9884345d85abcd2f05281",
    measurementId: "G-4BVW92S30E"
};

class Fire {
    constructor(callback) {
        this.init(callback);
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, "");
            } else {
                firebase.auth().signInAnonymously().catch(error => { callback(error); });
            }
        })
    }
    getLists(callback) {
        let ref = this.ref.orderBy("title");

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];

            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() })
            })

            callback(lists)
        })
    }

    
    get userId() {
        return firebase.auth().currentUser.uid
        // return "fTtxyh7vTKbg28vP40N3GQ2gsoV2"
    }


    detach() {
        this.unsubscribe()
    }

    get ref() {
        return firebase
            .firestore()
            .collection("forms")
            .doc("fTtxyh7vTKbg28vP40N3GQ2gsoV2")
            .collection("lists")
    }
}

export default Fire;