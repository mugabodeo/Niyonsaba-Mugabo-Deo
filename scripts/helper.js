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


// authentication scrr__


// validation patterns

const contactForm= document.querySelector('#contactForm');
const pattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
contactForm.addEventListener('submit',function(e){
    e.preventDefault();
    e.stopPropagation();
    const email= contactForm['email'].value;
    const name=contactForm['name'].value;
    const subject=contactForm['subject'].value;
    const contactError=document.querySelector("#contactError");
    if(email.match(pattern)){
        db.collection("queries").add({
            email:email,
            name:name,
            subject:subject
        })
        .then(function (res) {
            contactForm.reset()
        })
        .catch(function (err) {
            contactError.innerHTML=err.message;
        }); 
    }

    else{
        contactError.innerHTML="please enter valid email address";
    }
       
})


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