// authentication scrr__
var pattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const formLogin=document.querySelector('#formLogin');
let errorMessage=document.querySelector('#Error');

formLogin.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email=formLogin['email'].value;
    const password=formLogin['password'].value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(cred => {
            console.log(cred);
            formLogin.reset();
            window.location.replace('/blog.html')
        })
        .catch(err=>{
            errorMessage.innerHTML=err.message;
        })
});

function signOut(){
    firebase.auth().signOut();
}

function signInStatus(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            let theDiv=document.querySelector("#myTopnav");
            theDiv.innerHTML +='<a href="" onclick=signOut() > Log out</a>';

            errorMessage.innerHTML=`you are already logged. click here to <a href="" onclick="signOut()"> Log out</a>`;
            
        } 
        else{
            let theDiv=document.querySelector("#myTopnav");
            theDiv.innerHTML +='<a href="/login.html"> sign in</a>'
        }
    });
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





// validation patterns

function loginValidation(){  
    let email= document.getElementById('email').value;
    const formLogin=document.querySelector('#formLogin');
    let Error=document.getElementById("Error")
    formLogin.addEventListener('submit',(e)=>{
        if(email.match(pattern)){
            Error.innerHTML="your email address is valid";
        }

        else{
            Error.innerHTML="please enter valid email address";
            e.preventDefault();
        }
       
    })
}

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