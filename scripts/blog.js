
function signInStatus(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            let theDiv=document.querySelector("#myTopnav");
            theDiv.innerHTML +='<a href="" onclick=signOut() > Log out</a>';
            
        } 
        else{
            let theDiv=document.querySelector("#myTopnav");
            theDiv.innerHTML +='<a href="../templates/login.html"> sign in</a>'
        }
    });
}