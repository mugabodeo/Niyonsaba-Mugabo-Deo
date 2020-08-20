
const formLogin=document.querySelector('#formLogin');
formLogin.addEventListener('submit',function(e){
    e.preventDefault();
    e.stopPropagation();

    const emailPattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const errorMessage=document.querySelector("#errorMessage");
    const email=formLogin['email'].value;
    const password=formLogin['password'].value
            
    if(email.match(emailPattern)){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(cred){
            formLogin.reset();
        })
        .catch(function(err){
            errorMessage.innerHTML=err.message
        })
    }
            
    else{   
        errorMessage.innerHTML="invalid email or password"
    }
    
})


function signInStatus(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.replace('/templates/blog.html')
        } 
    });
}