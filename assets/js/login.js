// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCmcnWQF8G_WUg0e9P4qyLFhLzkuB3YN_I',
  authDomain: 'ecommerce2-6c1f4.firebaseapp.com',
  databaseURL: 'https://ecommerce2-6c1f4.firebaseio.com',
  projectId: 'ecommerce2-6c1f4',
  storageBucket: 'ecommerce2-6c1f4.appspot.com',
  messagingSenderId: '192229541944'
};
firebase.initializeApp(config);

function logGoogle() {
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      var name = result.user.displayName;
      var correo = result.user.email;
      var foto = result.user.photoURL;
      var red = 'Google';
      location.href = 'index.html?name=' + name;
    }).catch(function(error) {
      var errorCode = error.code;
      if (errorCode === 'auth/account-exist-with-diferen-credential') {
        alert('el usuario ya existe');
      }
    });
  } else {
    firebase.auth().signOut();
  }
}
document.getElementById('btn-Google').addEventListener('click', logGoogle, false);