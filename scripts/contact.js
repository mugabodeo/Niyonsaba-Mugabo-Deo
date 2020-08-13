
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