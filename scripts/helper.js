
//signout
function signOut(){
    firebase.auth().signOut();
}

//Get your location
function getLocation(showPosition) {
   if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition( position =>{
           let latitude=position.coords.latitude;
           let longitude=position.coords.longitude;
           console.log(` this is lat : ${latitude} and long is : ${longitude}`)
       })
   }
  
}



/*function commentValidation(){
    const email= document.getElementById('email').value;
    const form= document.getElementById('form');
    const commentError=document.getElementById('commentError');
    
    form.addEventListener('submit',(e)=>{
        if(email.match(pattern)){
            commentError.innerHTML="your email address is valid";
        }
        else{
            commentError.innerHTML="please enter valid email address";
            e.preventDefault();
        }
       
    })

}
*/