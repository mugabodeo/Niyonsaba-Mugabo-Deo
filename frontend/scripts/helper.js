
//firebase config
var firebaseConfig = {
    apiKey: "AIzaSyCdtOQhoms2I52-tW1E_b-9c75yMaknUeo",
    authDomain: "niyonsaba-blog.firebaseapp.com",
    databaseURL: "https://niyonsaba-blog.firebaseio.com",
    projectId: "niyonsaba-blog",
    storageBucket: "niyonsaba-blog.appspot.com",
    messagingSenderId: "99333250588",
    appId: "1:99333250588:web:52bdccf2770739045dc9d9",
    measurementId: "G-H9F0CN2HYG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore();


// navbar magic spell
window.onscroll = function() {scrollFunction()};
var navbar = document.getElementById("navBar");
var sticky = navbar.offsetTop+1;

function scrollFunction() {
    if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
        }
    else {
        navbar.classList.remove("sticky");
          }
}  


  function myFunction() {
    var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
        document.getElementById("myNav").style.width = "100%";
      }
      else {
        x.className = "topnav";
      }
  }
 
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}


function signOut(){
  firebase.auth().signOut().then(function(){
    console.log('signed out')
  })
}

