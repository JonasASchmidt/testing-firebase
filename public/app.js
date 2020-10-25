

// Functions that are not immediately executed

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

        .then(result => {
            const user = result.user;
            document.write(`Hello ${user.displayName}`);
            console.log(user);

        })
        .catch(console.log);
}


function updateCheckin(e) {
    const db = firebase.firestore();
    const myCheckin = db.collection('demokunde').doc('firstcheckin');
    myCheckin.update({ name: e.target.value });
}


function uploadFile(files) {
    const storageRef = firebase.storage().ref();
    const horseRef = storageRef.child('horse.jpg');

    const file = files.item(0);

    const task = horseRef.put(file)

    task.then(snapshot => {
        console.log(snapshot);
        const url = snapshot.downloadURL;
        console.log(url);
        document.querySelector('#imgUpload').setAttribute('src', url);
    })
}




// On DOMContentLoaded do stuff like set the scene/context (what HTML-Elements are visible) and what data is being loaded etc.

document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    // console.log(app);

    const db = firebase.firestore();

    const myCheckin = db.collection('demokunde').doc('firstcheckin');

    // myCheckin.get()

    // Read data once and write it to the page
    // .then(doc => {

    //     const data = doc.data();

    //     // document.write hides all initial existing page content here
    //     document.write( data.name + `<br>`)
    //     document.write( data.checkin_date + `<br>`)
    //     document.write( data.timestamp + `<br>`)
    //     document.write( data.firebase_realtime_timestamp )
    // })

    myCheckin.onSnapshot(doc => {

        const data = doc.data();
        document.querySelector('#name').innerHTML = data.name;
        document.querySelector('input').value = data.name;

    })


    const productsRef = db.collection('products');

    // const query = productsRef.where('price', '>=', 10);
    const query = productsRef.orderBy('price');


    query.get()
        .then(products => {
            products.forEach(doc => {
                data = doc.data();
                // document.write(`${data.name} at ${data.price} € <br>`);
            })
        })






    const loadEl = document.querySelector('#load');
    // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // The Firebase SDK is initialized and available here!

    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    // firebase.analytics(); // call to activate
    // firebase.analytics().logEvent('tutorial_completed');
    // firebase.performance(); // call to activate

    // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    try {
        let app = firebase.app();
        let features = [
            'auth',
            'database',
            'messaging',
            'storage',
            'analytics',
            'remoteConfig',
            'performance',
        ].filter(feature => typeof app[feature] === 'function');
        loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;
    } catch (e) {
        console.error(e);
        loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
    }
});


