// Initialize Firebase
var config = {
    apiKey: "AIzaSyCVnF1OOb0sxSYn0VyVHqSSeu0E8zXtW4U",
    authDomain: "test-e339a.firebaseapp.com",
    databaseURL: "https://test-e339a.firebaseio.com",
    projectId: "test-e339a",
    storageBucket: "test-e339a.appspot.com",
    messagingSenderId: "408235569660"
};
firebase.initializeApp(config);

var database = firebase.database();

firebase
    .database()
    .ref('users/' + 3)
    .set({username: 'Hola', email: 'luisg@mobkii.com', profile_picture: 'google.com'});

var leadsRef = database.ref('users');
leadsRef.on('value', function (snapshot) {
    $('.usuarios').html('');
    snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        $('.usuarios').append(`<li class="list-group-item">` + childData.username + `<button onClick="eliminar('` + childSnapshot.key + `')" class="btn btn-danger pull-right">Eliminar</button></li>`);
    });
});

function eliminar(id) {
    firebase
        .database()
        .ref('users')
        .child(id)
        .remove();
}

function agregar() {
    var name = $('#name').val();
    var correo = $('#correo').val();
    firebase
        .database()
        .ref('users')
        .push({username: name, email: correo, profile_picture: 'google.com'});
    $('#name').val('');
    $('#correo').val('');
}

// window.fbAsyncInit = function () {
//     FB.init({appId: '631567633704346', xfbml: true, version: 'v2.6'});
// };

// (function (d, s, id) {
//     var js,
//         fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) {
//         return;
//     }
//     js = d.createElement(s);
//     js.id = id;
//     js.src = "https://connect.facebook.net/en_US/sdk.js";
//     fjs
//         .parentNode
//         .insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));


var provider = new firebase
    .auth
    .FacebookAuthProvider();

function login() {
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook
            // API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user.displayName);
            alert('Hola ' + user.displayName);
            // ...
        })
        .catch(function (error) {
            // Handle Errors here.
            console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
}
