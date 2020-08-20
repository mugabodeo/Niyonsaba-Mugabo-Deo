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
var pattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

// validation patterns



function contactValidation(){
    const contactForm= document.querySelector('#contactForm');
    const contactError=document.getElementById("contactError");
    const email= contactForm['email'].value;
    const name=contactForm['name'].value;
    const subject=contactForm['subject'].value
    
    contactForm.addEventListener('submit',(e)=>{
        if(email.match(pattern)){
            contactError.innerHTML="success";
            db.collection('queries').add({
                email:email,
                name:name,
                subject:subject
            }).then(success =>{
                console.log('success')
            }).catch(err=>{
                console.log('error')
            })
        }

        else{
        
            contactError.innerHTML="please enter valid email address";
            e.preventDefault();
        }
       
    })

}

function commentValidation(){
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
